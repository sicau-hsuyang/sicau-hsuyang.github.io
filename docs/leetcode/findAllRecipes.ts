export function findAllRecipes(
  recipes: string[],
  ingredients: string[][],
  supplies: string[]
): string[] {
  const results: string[] = [];
  const map: Map<number, boolean> = new Map();
  // 原材料
  const provider = supplies.slice(0);
  let curMaterialCount = provider.length;
  while (true) {
    for (let i = 0; i < recipes.length; i++) {
      const cur = recipes[i];
      // 如果当前这道菜已经做过了，跳过这道菜
      if (map.get(i)) {
        continue;
      }
      const material = ingredients[i];
      // 如果当前的菜可以做
      if (
        material.every((m) => {
          return provider.includes(m);
        })
      ) {
        provider.push(cur);
        results.push(cur);
        map.set(i, true);
      }
    }
    // 如果再做一轮菜，发现已经没有新的菜可以做了，那么就结束循环
    if (provider.length === curMaterialCount) {
      break;
    } else {
      curMaterialCount = provider.length;
    }
  }
  return results;
}
