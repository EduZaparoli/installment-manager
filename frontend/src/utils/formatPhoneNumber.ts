export const formatCellphoneNumber = (value: string): string => {
    return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4')
}