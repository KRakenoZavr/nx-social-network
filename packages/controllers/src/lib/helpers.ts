export const errorHandler = (err: any) => {
  if (err instanceof Error) {
    return {
      data: err.message,
      code: 1,
    }
  }
  return {
    data: err,
    code: 1,
  }
}
