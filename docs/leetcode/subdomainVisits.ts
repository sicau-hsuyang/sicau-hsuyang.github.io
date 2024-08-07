interface DomainTreeNode {
  domain: string;
  counter: number;
  children: Map<string, DomainTreeNode>;
}

function statisticsDomainTree(
  counter: number,
  domain: string,
  parentMap: Map<string, DomainTreeNode>
) {
  const partitions = domain.split(".");
  let preSum = "";
  for (let i = partitions.length - 1; i >= 0; i--) {
    const domainItem = partitions[i];
    if (preSum === "") {
      preSum = domainItem;
    } else {
      preSum = domainItem + "." + preSum;
    }
    let domainNode = parentMap.get(domainItem);
    if (domainNode) {
      domainNode.counter += counter;
    } else {
      domainNode = {
        domain: preSum,
        counter,
        children: new Map(),
      };
      parentMap.set(domainItem, domainNode);
    }
    parentMap = domainNode.children;
  }
}

function levelTraverse(nodes: DomainTreeNode[]) {
  const queue: DomainTreeNode[] = [...nodes];
  const res: string[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    res.push(node.counter + " " + node.domain);
    node.children.forEach((child) => {
      queue.push(child);
    });
  }
  return res;
}

export function subdomainVisits(cpdomains: string[]): string[] {
  const map: Map<string, DomainTreeNode> = new Map();
  cpdomains.forEach((item) => {
    const part = item.split(" ");
    statisticsDomainTree(Number.parseInt(part[0]), part[1], map);
  });
  return levelTraverse([...map.values()]);
}
