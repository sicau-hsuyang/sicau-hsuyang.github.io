export class NumArray {
  private prefixSums: number[] = [0];

  constructor(nums: number[]) {
    for (let i = 0; i < nums.length; i++) {
      // this.prefixSums[i] = (this.prefixSums[i - 1] || 0) + nums[i];
      this.prefixSums[i + 1] = this.prefixSums[i] + nums[i];
    }
  }

  sumRange(left: number, right: number): number {
    // return this.prefixSums[right] - (this.prefixSums[left - 1] || 0);
    return this.prefixSums[right + 1] - this.prefixSums[left];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
