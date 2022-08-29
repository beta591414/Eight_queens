def conflict(nextX, state):
    nextY = len(state)
    for i in range(len(state)):
        if abs(nextX - state[i]) in (0, nextY - i):
            return False
    return True


def my_queen(num, state=()):
    for pos in range(num):
        if conflict(pos, state):  # 只剩最后一个，直接加到末尾
            if len(state) == num - 1:
                yield (pos,)
            else:
                for result in my_queen(num, state + (pos,)):  # 当八皇后的顺序没有到最后一个时，需要将刚刚不冲突的作为state参数传进去
                    yield (pos, ) + result



def pretty_print(state):
    num = len(state)
    for pos in state:
        print('-' * pos + '#' + '-' * (num - pos - 1))


if __name__ == '__main__':
    all_num = 0
    all_nums = []
    for j in range(8):
        temp_tuple = (j,)
        for i in my_queen(8,(j,)):
         all_num = all_num+1
         print(type(i))
         i = temp_tuple+i
         i = list(i)
         all_nums.append(i)
         print(i)
    print(all_num)
    f=open("k.txt","w")
    for line in all_nums:
        f.write(str(line)+"\n")
    f.close()
