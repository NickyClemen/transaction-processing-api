### Transaction Proccesing API

Este módulo fue construído como un emulador de procesador de pagos para dinero en cuenta.
El mismo se encuentra conformado por tres módulos principales:

  1. queue-transactions
    Este módulo expone un endpoint ('/v1/transactions/receive') para ser consumida por clientes externos. Sólo contiene un método POST cuyo payload es el siguiente:

      ```json
        externalId: identificador único de la transacción que está siendo procesada por el agente externo.
        ip: IP del momento en que se ejecutó el inicio de la transacción. El mismo se utiliza como parámetro para validaciones de seguridad.
        buyer: Objeto con datos requeridos para validar la cuenta del comprador.
        amount: Importe de la transacción.
        currency: moneda en la cuál se procesara el pago.
        type: tipo de transacción. En este caso será en pesos argentinos (ARS), pero el módulo puede ser iterado para agregar otras monedas y flujos de cobro a partir de ellas.
      ```

    Luego de recibir los datos, se encarga de enviar la transacción a una queue SQS para su procesamiento asíncrono.

  2. receive-transactions

    Lambda Function que se triggerea cuando la queue recibe mensajes. La misma ejecuta una serie de validaciones para asegurar que:
      1) La transacción no esté duplicada por medio de la utilización de una tabla de transacciones en Dynamo llamada 'queud-transactions', con la cuál
      se lleva un traqueo de la transacción en la queue y un registro histórico temporal. La misma debe ser limpiada cada veinticatro horas.
      2) Si la transacción de encuentra duplicada, el módulo la elimina de la queue y continúa procesando la siguiente.
      3) Al completarse el pro-procesamiento, se procede a invocar el validation-service para procesar la transacción.
      4) Al completarse la ejecución del servicio, la transacción es almacenada en la tabla 'transactions', se actualiza el status en 'queud-transactions' y es eliminada de la queue.

  3. validation-service

    Lambda function que realiza una serie de validaciones sobre la transacción bajo una serie de reglas:
      1) Titularidad de la cuenta.
      2) Geolocalización.
      3) Saldo en cuenta.
      4) El tipo de moneda.
      5) Cantidad de transacciones hechas dentro de un límite de tiempo.

      Todas esas reglas deben ser cumplidas para que el simulador procese el pago y cambie su estado a 'PAID', sino el mismo será rechazado y con el subsiguiente 'REJECT'
      y description del motivo del rechazo.

  Cada módulo fue pensando para que cumpla una sola tarea y limitar el alcance de los recursos a los que puede acceder, intentando facilitar, en el camino, la complejidad del mantenimiento y escalabilidad
  de la solución.

  El proyecto en código fue construído sobre un monorepo de Nestjs para facilitar el acceso de los módulos a los recursos compartidos entre los módulos. La infraestructura está montada con Terraform y los
  servicios de AWS son simulados con LocalStack.
