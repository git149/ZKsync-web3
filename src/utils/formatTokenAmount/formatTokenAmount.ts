/**
 * Format Token Amount Utility
 * @author git149
 * @description Format wei amounts to human readable token amounts
 */

export function formatTokenAmount(weiAmount: number, decimals: number): string {
    const tokenAmount = weiAmount / Math.pow(10, decimals)
    return tokenAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
