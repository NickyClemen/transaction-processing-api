export default function errorMapper(error) {
  const { $medatada } = error;
  console.log($medatada);
}
