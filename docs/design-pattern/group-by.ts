/**
 * 对数据进行分组
 * @param arr 源数据
 * @param groupByPredicate 分组条件
 * @returns
 */
export function groupBy<T>(
  arr: T[],
  groupByPredicate: ((item: T) => string) | string
) {
  const fn =
    typeof groupByPredicate === "string"
      ? (item: T) => item[groupByPredicate]
      : groupByPredicate;
  const record: Record<string, T[]> = {};
  arr.forEach((item) => {
    const groupByProp = fn(item);
    let group = record[groupByProp];
    if (!group) {
      record[groupByProp] = [item];
    } else {
      group.push(item);
    }
  });
  return record;
}
