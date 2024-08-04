export function isPassedThreeHours(referenceDate: Date | null) {
  if (!referenceDate) throw new Error('Data de referência não encontrada!')

  const THREE_HOURS_IN_MILLISECONDS = 3 * 60 * 60 * 1000
  const referenceDateTime = new Date(referenceDate).getTime()
  const currentTime = new Date().getTime()

  const timeDifference = currentTime - referenceDateTime;

  return timeDifference >= THREE_HOURS_IN_MILLISECONDS;
}