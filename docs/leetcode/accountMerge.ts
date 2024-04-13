interface User {
  userName: string;
  emails: string[];
}

export function accountsMerge(accounts: string[][]): string[][] {
  // 映射邮箱到用户
  const emailRefUserMap: Map<string, User[]> = new Map();
  const usersCollection: User[] = [];
  const mergedUserSet: Set<User> = new Set();
  accounts.forEach((userInfo) => {
    const [userName, ...emails] = userInfo;
    const user: User = {
      userName,
      emails,
    };
    usersCollection.push(user);
    emails.forEach((email) => {
      const userSets = emailRefUserMap.get(email) || [];
      if (userSets.length === 0) {
        emailRefUserMap.set(email, userSets);
      }
      userSets.push(user);
    });
  });
  const results: string[][] = [];
  for (let i = 0; i < usersCollection.length; i++) {
    const userNode = usersCollection[i];
    if (mergedUserSet.has(userNode)) {
      continue;
    }
    const mergedEmails = merge(userNode, emailRefUserMap, mergedUserSet);
    mergedEmails.sort()
    const record = [userNode.userName, ...mergedEmails];
    results.push(record);
  }
  return results;
}

function merge(
  user: User,
  emailRefUserMap: Map<string, User[]>,
  usedUserSet: Set<User>
): string[] {
  // 如果已经合并过了的话
  if (usedUserSet.has(user)) {
    return [];
  }
  const emailSet: Set<string> = new Set();
  usedUserSet.add(user);
  const emails = user.emails;
  for (const email of emails) {
    // 添加自己本身的邮箱
    emailSet.add(email);
    // 找到级联的邮箱
    const refUsers: User[] = (emailRefUserMap.get(email) || []) as User[];
    refUsers.forEach((subUser) => {
      const subEmails = merge(subUser, emailRefUserMap, usedUserSet);
      subEmails.forEach((eml) => {
        emailSet.add(eml);
      });
    });
  }
  return [...emailSet];
}
