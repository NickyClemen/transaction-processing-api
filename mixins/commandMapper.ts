export default function commandMapper(command, input) {
  return new command({
    TableName: input.tableName,
    AttributesToGet: input.attributesToGet,
    ConsistentRead: input.consistentRead,
    ReturnConsumedCapacity: input.returnConsumedCapacity,
    ProjectionExpression: input.projectionExpression,
    ExpressionAttributeNames: input.expressionAttributeNames,
    Key: {
      ...input.key,
    },
  });
}
