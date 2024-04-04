class Solution
{
    public int test(int[] nums)
    {
        int  result=0;
 
        //记录下每个位置元素最开始的坐标
        //比如  5 4 1 2 3  hashmap里面存的key:value就是 5：0   4 :1   1:2   2:3   3:4
        HashMap<Integer,Integer>  hashmap=new HashMap();
 
        for(int i=0;i<nums.length;i++)
        {
            hashmap.put(nums[i],i);//原数组中每个数对应的索引
        }
 
        //升序数组里应该是1,2,3,4,5
        for(int i=0;i<nums.length;i++)
        {
           if(nums[i]!=i+1)//索引为i的位置，应该放i+1
           {
 
               int index=hashmap.get(i+1);//取出i+1这个数在原数组中的索引,这行代码神来之笔
 
              
               //交换nums[i]和nums[index]
               int  temp=nums[i];
 
               nums[i]=nums[index];
 
               nums[index]=temp;
 
               result++;
           }
           else
           {
               continue;
           }
        }
        return  result;
 
    }
}
 
public class Test
{
    public static void main(String[] args)
    {
      Solution solution=new Solution();
//      int[] nums={5,4,1,2,3};
      int[] nums={5,4,3,2,1};
      System.out.println(solution.test(nums));
 
    }
}