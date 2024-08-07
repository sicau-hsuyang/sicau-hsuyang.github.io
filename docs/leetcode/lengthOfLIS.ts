export function lengthOfLIS(nums: number[]): number {
  let MAX = nums[0];
  const dp: Array<{
    end: number;
    len: number;
  }> = [
    {
      end: nums[0],
      len: 1,
    },
  ];
  for (let i = 0; i < nums.length; i++) {
    if (dp[i - 1].end < nums[i]) {
      dp[i] = {
        end: nums[i],
        len: dp[i - 1].len + 1,
      };
    } else {
      dp[i] = {
        end: nums[i],
        len: 1,
      };
    }
    if (dp[i].len > MAX) {
      MAX = dp[i].len;
    }
  }
  return MAX;
}
