// Prices are shown the way brief.md asks: vi-VN separators and " đ".
export function vnd(amount) {
  return amount.toLocaleString('vi-VN') + ' đ';
}
