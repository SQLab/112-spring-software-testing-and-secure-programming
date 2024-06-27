# Answer

Name: 陳銘庭
ID: 512558011

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     V    |   V  |
| Stack out-of-bounds  |     X    |   V  |
| Global out-of-bounds |     X    |   V  |
| Use-after-free       |     V    |   V  |
| Use-after-return     |     V    |   V  |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>

int main() {
    int *arr = malloc(10 * sizeof(int));
    arr[15] = 42; // Heap out-of-bounds write
    int value = arr[20]; // Heap out-of-bounds read
    free(arr);
    return 0;
}
```
#### Valgrind Report
```

tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5$ valgrind ./Heap-out-of-bounds 
==28351== Memcheck, a memory error detector
==28351== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28351== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==28351== Command: ./Heap-out-of-bounds
==28351== 
==28351== Invalid write of size 4
==28351==    at 0x10918B: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Heap-out-of-bounds)
==28351==  Address 0x4a9607c is 20 bytes after a block of size 40 alloc'd
==28351==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==28351==    by 0x10917E: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Heap-out-of-bounds)
==28351== 
==28351== Invalid read of size 4
==28351==    at 0x109195: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Heap-out-of-bounds)
==28351==  Address 0x4a96090 is 32 bytes before an unallocated block of size 4,194,096 in arena "client"
==28351== 
==28351== 
==28351== HEAP SUMMARY:
==28351==     in use at exit: 0 bytes in 0 blocks
==28351==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==28351== 
==28351== All heap blocks were freed -- no leaks are possible
==28351== 
==28351== For lists of detected and suppressed errors, rerun with: -s
==28351== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)

tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5$ valgrind --tool=cachegrind ./Heap-out-of-bounds 
==28360== Cachegrind, a cache and branch-prediction profiler
==28360== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==28360== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==28360== Command: ./Heap-out-of-bounds
==28360== 
--28360-- warning: L3 cache found, using its data for the LL simulation.
==28360== 
==28360== I   refs:      149,771
==28360== I1  misses:      1,228
==28360== LLi misses:      1,212
==28360== I1  miss rate:    0.82%
==28360== LLi miss rate:    0.81%
==28360== 
==28360== D   refs:       47,733  (34,815 rd   + 12,918 wr)
==28360== D1  misses:      2,193  ( 1,566 rd   +    627 wr)
==28360== LLd misses:      1,895  ( 1,307 rd   +    588 wr)
==28360== D1  miss rate:     4.6% (   4.5%     +    4.9%  )
==28360== LLd miss rate:     4.0% (   3.8%     +    4.6%  )
==28360== 
==28360== LL refs:         3,421  ( 2,794 rd   +    627 wr)
==28360== LL misses:       3,107  ( 2,519 rd   +    588 wr)
==28360== LL miss rate:      1.6% (   1.4%     +    4.6%  )

```
### ASan Report
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5$ ./Heap-out-of-bounds-Asan 
=================================================================
==29073==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60400000004c at pc 0x5a7b431eb242 bp 0x7ffceb506c70 sp 0x7ffceb506c60
WRITE of size 4 at 0x60400000004c thread T0
    #0 0x5a7b431eb241 in main (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Heap-out-of-bounds-Asan+0x1241)
    #1 0x7925f4829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7925f4829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5a7b431eb124 in _start (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Heap-out-of-bounds-Asan+0x1124)

0x60400000004c is located 20 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7925f4cb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5a7b431eb1fe in main (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Heap-out-of-bounds-Asan+0x11fe)
    #2 0x7925f4829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Heap-out-of-bounds-Asan+0x1241) in main
Shadow bytes around the buggy address:
  0x0c087fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c087fff8000: fa fa 00 00 00 00 00 fa fa[fa]fa fa fa fa fa fa
  0x0c087fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==29073==ABORTING
```
Valgrind 可以 ASan 可以 找出來 Heap out-of-bounds read/write

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int stack[3] = {1, 2, 3};

    // Reading beyond the stack size
    printf("Value at index 3: %d\n", stack[3]); // This will cause stack out-of-bounds read

    // Writing beyond the stack size
    stack[4] = 10; // This will cause stack out-of-bounds write

    return 0;
}


```
#### Valgrind Report
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5$ valgrind ./Stack-out-of-bounds 
==30528== Memcheck, a memory error detector
==30528== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==30528== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==30528== Command: ./Stack-out-of-bounds
==30528== 
Value at index 3: 1608946688
*** stack smashing detected ***: terminated
==30528== 
==30528== Process terminating with default action of signal 6 (SIGABRT)
==30528==    at 0x49009FC: __pthread_kill_implementation (pthread_kill.c:44)
==30528==    by 0x49009FC: __pthread_kill_internal (pthread_kill.c:78)
==30528==    by 0x49009FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==30528==    by 0x48AC475: raise (raise.c:26)
==30528==    by 0x48927F2: abort (abort.c:79)
==30528==    by 0x48F3675: __libc_message (libc_fatal.c:155)
==30528==    by 0x49A0599: __fortify_fail (fortify_fail.c:26)
==30528==    by 0x49A0565: __stack_chk_fail (stack_chk_fail.c:24)
==30528==    by 0x1091D1: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Stack-out-of-bounds)
==30528== 
==30528== HEAP SUMMARY:
==30528==     in use at exit: 1,024 bytes in 1 blocks
==30528==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==30528== 
==30528== LEAK SUMMARY:
==30528==    definitely lost: 0 bytes in 0 blocks
==30528==    indirectly lost: 0 bytes in 0 blocks
==30528==      possibly lost: 0 bytes in 0 blocks
==30528==    still reachable: 1,024 bytes in 1 blocks
==30528==         suppressed: 0 bytes in 0 blocks
==30528== Rerun with --leak-check=full to see details of leaked memory
==30528== 
==30528== For lists of detected and suppressed errors, rerun with: -s
==30528== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted (core dumped)

tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5$ valgrind --tool=cachegrind ./Stack-out-of-bounds 
==30538== Cachegrind, a cache and branch-prediction profiler
==30538== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==30538== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==30538== Command: ./Stack-out-of-bounds
==30538== 
--30538-- warning: L3 cache found, using its data for the LL simulation.
Value at index 3: 535893248
*** stack smashing detected ***: terminated
==30538== 
==30538== Process terminating with default action of signal 6 (SIGABRT)
==30538==    at 0x48E89FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:44)
==30538==    by 0x4894475: raise (raise.c:26)
==30538==    by 0x487A7F2: abort (abort.c:79)
==30538==    by 0x48DB675: __libc_message (libc_fatal.c:155)
==30538==    by 0x4988599: __fortify_fail (fortify_fail.c:26)
==30538==    by 0x4988565: __stack_chk_fail (stack_chk_fail.c:24)
==30538==    by 0x1091D1: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Stack-out-of-bounds)
==30538== 
==30538== I   refs:      151,408
==30538== I1  misses:      1,282
==30538== LLi misses:      1,273
==30538== I1  miss rate:    0.85%
==30538== LLi miss rate:    0.84%
==30538== 
==30538== D   refs:       48,137  (35,070 rd   + 13,067 wr)
==30538== D1  misses:      2,211  ( 1,583 rd   +    628 wr)
==30538== LLd misses:      1,909  ( 1,320 rd   +    589 wr)
==30538== D1  miss rate:     4.6% (   4.5%     +    4.8%  )
==30538== LLd miss rate:     4.0% (   3.8%     +    4.5%  )
==30538== 
==30538== LL refs:         3,493  ( 2,865 rd   +    628 wr)
==30538== LL misses:       3,182  ( 2,593 rd   +    589 wr)
==30538== LL miss rate:      1.6% (   1.4%     +    4.5%  )
Aborted (core dumped)


```
### ASan Report
```
//gcc -fsanitize=address -Og -g -o Stack-out-of-bounds-Asan Stack-out-of-bounds.c

tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5$ ./Stack-out-of-bounds-Asan 
=================================================================
==30693==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffae1d4fbc at pc 0x5a77666743f4 bp 0x7fffae1d4f80 sp 0x7fffae1d4f70
READ of size 4 at 0x7fffae1d4fbc thread T0
    #0 0x5a77666743f3 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Stack-out-of-bounds.c:7
    #1 0x728efdc29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x728efdc29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5a7766674184 in _start (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Stack-out-of-bounds-Asan+0x1184)

Address 0x7fffae1d4fbc is located in stack of thread T0 at offset 44 in frame
    #0 0x5a7766674258 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Stack-out-of-bounds.c:3

  This frame has 1 object(s):
    [32, 44) 'stack' (line 4) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/Stack-out-of-bounds.c:7 in main
Shadow bytes around the buggy address:
  0x100075c329a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c329b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c329c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c329d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c329e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100075c329f0: 00 00 f1 f1 f1 f1 00[04]f3 f3 00 00 00 00 00 00
  0x100075c32a00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c32a10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c32a20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c32a30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075c32a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==30693==ABORTING

```
Valgrind 無法 ASan 可以 找出來 Stack out-of-bounds read/write

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int arr[5];

int main() {
    arr[10] = 42; // 寫入超出範圍的位置
    return 0;
}

```
#### Valgrind Report
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/3$ valgrind ./Global-out-of-bounds 
==31242== Memcheck, a memory error detector
==31242== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==31242== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==31242== Command: ./Global-out-of-bounds
==31242== 
==31242== 
==31242== HEAP SUMMARY:
==31242==     in use at exit: 0 bytes in 0 blocks
==31242==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==31242== 
==31242== All heap blocks were freed -- no leaks are possible
==31242== 
==31242== For lists of detected and suppressed errors, rerun with: -s
==31242== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/3$ valgrind --tool=cachegrind ./Global-out-of-bounds 
==31265== Cachegrind, a cache and branch-prediction profiler
==31265== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==31265== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==31265== Command: ./Global-out-of-bounds
==31265== 
--31265-- warning: L3 cache found, using its data for the LL simulation.
==31265== 
==31265== I   refs:      146,536
==31265== I1  misses:      1,138
==31265== LLi misses:      1,128
==31265== I1  miss rate:    0.78%
==31265== LLi miss rate:    0.77%
==31265== 
==31265== D   refs:       46,605  (34,201 rd   + 12,404 wr)
==31265== D1  misses:      2,125  ( 1,540 rd   +    585 wr)
==31265== LLd misses:      1,839  ( 1,294 rd   +    545 wr)
==31265== D1  miss rate:     4.6% (   4.5%     +    4.7%  )
==31265== LLd miss rate:     3.9% (   3.8%     +    4.4%  )
==31265== 
==31265== LL refs:         3,263  ( 2,678 rd   +    585 wr)
==31265== LL misses:       2,967  ( 2,422 rd   +    545 wr)
==31265== LL miss rate:      1.5% (   1.3%     +    4.4%  )


```
### ASan Report
```
// gcc -fsanitize=address -Og -g -o Global-out-of-bounds-Asan Global-out-of-bounds.c 
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/3$ ./Global-out-of-bounds-Asan 
=================================================================
==31294==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5e9a9a3f20c8 at pc 0x5e9a9a3ef203 bp 0x7ffebc6e1d20 sp 0x7ffebc6e1d10
WRITE of size 4 at 0x5e9a9a3f20c8 thread T0
    #0 0x5e9a9a3ef202 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/3/Global-out-of-bounds.c:6
    #1 0x7c50f6029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7c50f6029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5e9a9a3ef104 in _start (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/3/Global-out-of-bounds-Asan+0x1104)

0x5e9a9a3f20c8 is located 20 bytes to the right of global variable 'arr' defined in 'Global-out-of-bounds.c:3:5' (0x5e9a9a3f20a0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/3/Global-out-of-bounds.c:6 in main
Shadow bytes around the buggy address:
  0x0bd3d34763c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d34763d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d34763e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d34763f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d3476400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0bd3d3476410: 00 00 00 00 00 00 04 f9 f9[f9]f9 f9 00 00 00 00
  0x0bd3d3476420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d3476430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d3476440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d3476450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bd3d3476460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==31294==ABORTING

```
Valgrind 無法 ASan 可以 找出來 Global out-of-bounds read/write

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int *arr = malloc(5 * sizeof(int));
    free(arr); // 釋放記憶體
    arr[0] = 42; // 釋放後使用
    return 0;
}
```
#### Valgrind Report
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/4$ valgrind ./Use-after-free 
==31421== Memcheck, a memory error detector
==31421== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==31421== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==31421== Command: ./Use-after-free
==31421== 
==31421== Invalid write of size 4
==31421==    at 0x109193: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free)
==31421==  Address 0x4a96040 is 0 bytes inside a block of size 20 free'd
==31421==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==31421==    by 0x10918E: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free)
==31421==  Block was alloc'd at
==31421==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==31421==    by 0x10917E: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free)
==31421== 
==31421== 
==31421== HEAP SUMMARY:
==31421==     in use at exit: 0 bytes in 0 blocks
==31421==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==31421== 
==31421== All heap blocks were freed -- no leaks are possible
==31421== 
==31421== For lists of detected and suppressed errors, rerun with: -s
==31421== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/4$ valgrind --tool=cachegrind ./Use-after-free 
==31451== Cachegrind, a cache and branch-prediction profiler
==31451== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==31451== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==31451== Command: ./Use-after-free
==31451== 
--31451-- warning: L3 cache found, using its data for the LL simulation.
==31451== 
==31451== I   refs:      149,773
==31451== I1  misses:      1,229
==31451== LLi misses:      1,213
==31451== I1  miss rate:    0.82%
==31451== LLi miss rate:    0.81%
==31451== 
==31451== D   refs:       47,730  (34,813 rd   + 12,917 wr)
==31451== D1  misses:      2,192  ( 1,566 rd   +    626 wr)
==31451== LLd misses:      1,894  ( 1,307 rd   +    587 wr)
==31451== D1  miss rate:     4.6% (   4.5%     +    4.8%  )
==31451== LLd miss rate:     4.0% (   3.8%     +    4.5%  )
==31451== 
==31451== LL refs:         3,421  ( 2,795 rd   +    626 wr)
==31451== LL misses:       3,107  ( 2,520 rd   +    587 wr)
==31451== LL miss rate:      1.6% (   1.4%     +    4.5%  )
```
### ASan Report
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/4$ ./Use-after-free-Asan 
=================================================================
==31488==ERROR: AddressSanitizer: heap-use-after-free on address 0x603000000040 at pc 0x59af663ef217 bp 0x7ffcec51baf0 sp 0x7ffcec51bae0
WRITE of size 4 at 0x603000000040 thread T0
    #0 0x59af663ef216 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free.c:6
    #1 0x794798429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x794798429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x59af663ef104 in _start (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free-Asan+0x1104)

0x603000000040 is located 0 bytes inside of 20-byte region [0x603000000040,0x603000000054)
freed by thread T0 here:
    #0 0x7947988b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x59af663ef1e2 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free.c:5

previously allocated by thread T0 here:
    #0 0x7947988b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x59af663ef1d7 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/4/Use-after-free.c:6 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa[fd]fd fd fa fa fa fa fa
  0x0c067fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==31488==ABORTING

```

Valgrind 可以 ASan 可以 找出來 Use-after-free

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int *get_value() {
    int num = 10;
    return &num;
}

int main() {
    int *ptr = get_value();
    printf("Value: %d\n", *ptr); // 在函式執行完畢後仍然使用了被釋放的記憶體
    return 0;
}

```
#### Valgrind Report
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/5$ valgrind ./Use-after-return
==33062== Memcheck, a memory error detector
==33062== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==33062== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==33062== Command: ./Use-after-return
==33062== 
==33062== Invalid read of size 4
==33062==    at 0x1091C4: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/5/Use-after-return)
==33062==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==33062== 
==33062== 
==33062== Process terminating with default action of signal 11 (SIGSEGV)
==33062==  Access not within mapped region at address 0x0
==33062==    at 0x1091C4: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/5/Use-after-return)
==33062==  If you believe this happened as a result of a stack
==33062==  overflow in your program's main thread (unlikely but
==33062==  possible), you can try to increase the size of the
==33062==  main thread stack using the --main-stacksize= flag.
==33062==  The main thread stack size used in this run was 8388608.
==33062== 
==33062== HEAP SUMMARY:
==33062==     in use at exit: 0 bytes in 0 blocks
==33062==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==33062== 
==33062== All heap blocks were freed -- no leaks are possible
==33062== 
==33062== For lists of detected and suppressed errors, rerun with: -s
==33062== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)


tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/5$  valgrind --tool=cachegrind ./Use-after-return
==33074== Cachegrind, a cache and branch-prediction profiler
==33074== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==33074== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==33074== Command: ./Use-after-return
==33074== 
--33074-- warning: L3 cache found, using its data for the LL simulation.
==33074== 
==33074== Process terminating with default action of signal 11 (SIGSEGV)
==33074==  Access not within mapped region at address 0x0
==33074==    at 0x1091BC: main (in /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/5/Use-after-return)
==33074==  If you believe this happened as a result of a stack
==33074==  overflow in your program's main thread (unlikely but
==33074==  possible), you can try to increase the size of the
==33074==  main thread stack using the --main-stacksize= flag.
==33074==  The main thread stack size used in this run was 8388608.
==33074== 
==33074== I   refs:      146,945
==33074== I1  misses:      1,073
==33074== LLi misses:      1,064
==33074== I1  miss rate:    0.73%
==33074== LLi miss rate:    0.72%
==33074== 
==33074== D   refs:       46,689  (34,301 rd   + 12,388 wr)
==33074== D1  misses:      2,123  ( 1,544 rd   +    579 wr)
==33074== LLd misses:      1,846  ( 1,304 rd   +    542 wr)
==33074== D1  miss rate:     4.5% (   4.5%     +    4.7%  )
==33074== LLd miss rate:     4.0% (   3.8%     +    4.4%  )
==33074== 
==33074== LL refs:         3,196  ( 2,617 rd   +    579 wr)
==33074== LL misses:       2,910  ( 2,368 rd   +    542 wr)
==33074== LL miss rate:      1.5% (   1.3%     +    4.4%  )
Segmentation fault (core dumped)


```
### ASan Report
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/l5/5$ ./Use-after-return-Asan 
AddressSanitizer:DEADLYSIGNAL
=================================================================
==33018==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x58ab9dd79224 bp 0x000000000001 sp 0x7ffe43775f90 T0)
==33018==The signal is caused by a READ memory access.
==33018==Hint: address points to the zero page.
    #0 0x58ab9dd79224 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/5/Use-after-return.c:11
    #1 0x755306a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x755306a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x58ab9dd79124 in _start (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/5/Use-after-return-Asan+0x1124)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/tim/Desktop/112-spring-software-testing-and-secure-programming/l5/5/Use-after-return.c:11 in main
==33018==ABORTING

```
Valgrind 可以 ASan 可以 找出來 Use-after-return

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int array[10];
    for (int i = 0; i <= 10; ++i) {
        array[i] = i; // 寫入超出陣列範圍的索引
    }
    return 0;
}

```
### Why

在程式的 main 函式中的第7行，發生了對堆疊中地址為0x7ffd456ac4b8處的記憶體進行了寫入操作，而這個地址是位於堆疊中的，並且是發生了超出範圍寫入的位置，因此產生了stack-buffer-overflow的錯誤。
