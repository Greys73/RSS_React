export default function addSearchParam(
  searchParams: URLSearchParams,
  newKey: string,
  newValue: string
): URLSearchParams {
  const newParams: { [key: string]: string } = {};
  searchParams.forEach((value: string, key: string) => {
    newParams[key] = value;
  });
  newParams[newKey] = newValue;
  return newParams as unknown as URLSearchParams;
}
