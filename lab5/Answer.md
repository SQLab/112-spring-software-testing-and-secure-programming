# Answer

Name: 張又仁
ID: 511558009

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     T    |   T  |
| Stack out-of-bounds  |     T    |   T  |
| Global out-of-bounds |     T    |   T  |
| Use-after-free       |     T    |   F  |
| Use-after-return     |     F    |   F  |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *heap_array = malloc(8 * sizeof(int));  // 分配一個含 8 個整數的陣列
    heap_array[8] = 511558009;  // 越界寫入
    printf("%d\n", heap_array[8]);  // 越界讀取
    free(heap_array);
    return 0;
}
```
#### Valgrind Report
```
==47093== Memcheck, a memory error detector
==47093== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==47093== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==47093== Command: ./heap_out
==47093== 
==47093== Invalid write of size 4
==47093==    at 0x1091AB: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/heap_out)
==47093==  Address 0x4a96060 is 0 bytes after a block of size 32 alloc'd
==47093==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==47093==    by 0x10919E: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/heap_out)
==47093== 
==47093== Invalid read of size 4
==47093==    at 0x1091B9: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/heap_out)
==47093==  Address 0x4a96060 is 0 bytes after a block of size 32 alloc'd
==47093==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==47093==    by 0x10919E: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/heap_out)
==47093== 
511558009
==47093== 
==47093== HEAP SUMMARY:
==47093==     in use at exit: 0 bytes in 0 blocks
==47093==   total heap usage: 2 allocs, 2 frees, 1,056 bytes allocated
==47093== 
==47093== All heap blocks were freed -- no leaks are possible
==47093== 
==47093== For lists of detected and suppressed errors, rerun with: -s
==47093== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)

```
### ASan Report
```
511558009
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int stack_array[8];
    stack_array[8] = 511558009;  // 越界寫入
    printf("%d\n", stack_array[8]);  // 越界讀取
    return 0;
}
```
#### Valgrind Report
```
==47104== Memcheck, a memory error detector
==47104== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==47104== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==47104== Command: ./stack_out
==47104== 
511558009
==47104== 
==47104== HEAP SUMMARY:
==47104==     in use at exit: 0 bytes in 0 blocks
==47104==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==47104== 
==47104== All heap blocks were freed -- no leaks are possible
==47104== 
==47104== For lists of detected and suppressed errors, rerun with: -s
==47104== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
511558009
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int global_array[8];

int main() {
    global_array[8] = 511558009;  // 越界寫入
    printf("%d\n", global_array[8]);  // 越界讀取
    return 0;
}
```
#### Valgrind Report
```
==47115== Memcheck, a memory error detector
==47115== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==47115== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==47115== Command: ./global_out
==47115== 
511558009
==47115== 
==47115== HEAP SUMMARY:
==47115==     in use at exit: 0 bytes in 0 blocks
==47115==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==47115== 
==47115== All heap blocks were freed -- no leaks are possible
==47115== 
==47115== For lists of detected and suppressed errors, rerun with: -s
==47115== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
511558009
```

### Use-after-free
#### Source code
```
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *ptr = malloc(sizeof(int));
    *ptr = 511558009;
    free(ptr);
    printf("%d\n", *ptr);  // 使用後釋放
    return 0;
}
```
#### Valgrind Report
```
==47186== Memcheck, a memory error detector
==47186== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==47186== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==47186== Command: ./after_free
==47186== 
==47186== Invalid read of size 4
==47186==    at 0x1091BD: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/after_free)
==47186==  Address 0x4a96040 is 0 bytes inside a block of size 4 free'd
==47186==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==47186==    by 0x1091B8: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/after_free)
==47186==  Block was alloc'd at
==47186==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==47186==    by 0x10919E: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/after_free)
==47186== 
511558009
==47186== 
==47186== HEAP SUMMARY:
==47186==     in use at exit: 0 bytes in 0 blocks
==47186==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==47186== 
==47186== All heap blocks were freed -- no leaks are possible
==47186== 
==47186== For lists of detected and suppressed errors, rerun with: -s
==47186== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
-1966186091
```

### Use-after-return
#### Source code
```
#include <stdio.h>

int* func() {
    int local = 511558009;
    return &local;  // 返回區域變數的位址
}

int main() {
    int *ptr = func();
    printf("%d\n", *ptr);  // 返回後使用
    return 0;
}
```
#### Valgrind Report
```
==47126== Memcheck, a memory error detector
==47126== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==47126== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==47126== Command: ./use_after
==47126== 
==47126== Invalid read of size 4
==47126==    at 0x1091C4: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/use_after)
==47126==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==47126== 
==47126== 
==47126== Process terminating with default action of signal 11 (SIGSEGV)
==47126==  Access not within mapped region at address 0x0
==47126==    at 0x1091C4: main (in /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab5/use_after)
==47126==  If you believe this happened as a result of a stack
==47126==  overflow in your program's main thread (unlikely but
==47126==  possible), you can try to increase the size of the
==47126==  main thread stack using the --main-stacksize= flag.
==47126==  The main thread stack size used in this run was 8388608.
==47126== 
==47126== HEAP SUMMARY:
==47126==     in use at exit: 0 bytes in 0 blocks
==47126==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==47126== 
==47126== All heap blocks were freed -- no leaks are possible
==47126== 
==47126== For lists of detected and suppressed errors, rerun with: -s
==47126== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)
```
### ASan Report
```
use_after.c: In function ‘func’:
use_after.c:5:12: warning: function returns address of local variable [-Wreturn-local-addr]
    5 |     return &local;  // 返回區域變數的位址
      |            ^~~~~~
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[8] = {0}, b[8] = {0};
    a[8] = 511558009;  // 寫入 a 和 b 之間的 redzone
    printf("b[0] = %d\n", b[0]);  // 驗證是否影響到 b
    return 0;
}
```
### Why
當對 a[8] 寫入時，由於 a[8] 超出了 a 的界限（ a 的索引是從 0 到 7），所以實際上寫入的位置是 b[0]。這就是為什麼當檢查 b[0] 的值時，它顯示為 511558009 。
