# Answer

Name: 林庭亘
ID: 510558006

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
    int *ptr = (int *)malloc(5 * sizeof(int));
    ptr[5] = 20; // Accessing out-of-bounds memory
    free(ptr);
    return 0;
}
```
//gcc -Og -g -o test_valgrind test_valgrind.c
#### Valgrind Report
```
// valgrind ./test_valgrind
==4574== Memcheck, a memory error detector
==4574== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4574== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4574== Command: ./test_valgrind
==4574== 
==4574== Invalid write of size 4
==4574==    at 0x10917E: main (test_valgrind.c:5)
==4574==  Address 0x4a96054 is 0 bytes after a block of size 20 alloc'd
==4574==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==4574==    by 0x10917A: main (test_valgrind.c:4)
==4574== 
==4574== 
==4574== HEAP SUMMARY:
==4574==     in use at exit: 0 bytes in 0 blocks
==4574==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==4574== 
==4574== All heap blocks were freed -- no leaks are possible
==4574== 
==4574== For lists of detected and suppressed errors, rerun with: -s
==4574== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

//valgrind --tool=cachegrind ./test_valgrind
==4591== Cachegrind, a cache and branch-prediction profiler
==4591== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==4591== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4591== Command: ./test_valgrind
==4591== 
--4591-- Warning: Cannot auto-detect cache config, using defaults.
--4591--          Run with -v to see.
==4591== 
==4591== I   refs:      146,133
==4591== I1  misses:      1,227
==4591== LLi misses:      1,208
==4591== I1  miss rate:    0.84%
==4591== LLi miss rate:    0.83%
==4591== 
==4591== D   refs:       46,988  (34,122 rd   + 12,866 wr)
==4591== D1  misses:      2,099  ( 1,494 rd   +    605 wr)
==4591== LLd misses:      1,902  ( 1,313 rd   +    589 wr)
==4591== D1  miss rate:     4.5% (   4.4%     +    4.7%  )
==4591== LLd miss rate:     4.0% (   3.8%     +    4.6%  )
==4591== 
==4591== LL refs:         3,326  ( 2,721 rd   +    605 wr)
==4591== LL misses:       3,110  ( 2,521 rd   +    589 wr)
==4591== LL miss rate:      1.6% (   1.4%     +    4.6%  )

```
//gcc -fsanitize=address -Og -g -o test_valgrind_asan test_valgrind.c && ./test_valgrind_asan
### ASan Report
```
==4628==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x576b29f3d21f bp 0x7ffcf69d90f0 sp 0x7ffcf69d90e0
WRITE of size 4 at 0x603000000054 thread T0
    #0 0x576b29f3d21e in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/test_valgrind.c:5
    #1 0x719ab5e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x719ab5e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x576b29f3d104 in _start (/home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/test_valgrind_asan+0x1104)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x719ab62b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x576b29f3d1da in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/test_valgrind.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/test_valgrind.c:5 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00[04]fa fa fa fa fa
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
==4628==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
int main() {
    int array[10];
    array[10] = 123; // Writing outside the bounds of the array
    printf("Element at index 10: %d\n", array[10]); // Reading from the same out-of-bounds location
    return 0;
}
```
//gcc -Og -g -o Stack_Out-Of-Bounds Stack_Out-Of-Bounds.c
#### Valgrind Report
```
//valgrind ./Stack_Out-Of-Bounds
==6678== Memcheck, a memory error detector
==6678== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6678== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6678== Command: ./Stack_Out-Of-Bounds
==6678== 
Element at index 10: 123
*** stack smashing detected ***: terminated
==6678== 
==6678== Process terminating with default action of signal 6 (SIGABRT)
==6678==    at 0x49009FC: __pthread_kill_implementation (pthread_kill.c:44)
==6678==    by 0x49009FC: __pthread_kill_internal (pthread_kill.c:78)
==6678==    by 0x49009FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==6678==    by 0x48AC475: raise (raise.c:26)
==6678==    by 0x48927F2: abort (abort.c:79)
==6678==    by 0x48F3675: __libc_message (libc_fatal.c:155)
==6678==    by 0x49A0599: __fortify_fail (fortify_fail.c:26)
==6678==    by 0x49A0565: __stack_chk_fail (stack_chk_fail.c:24)
==6678==    by 0x1091BD: main (Stack_Out-Of-Bounds.c:7)
==6678== 
==6678== HEAP SUMMARY:
==6678==     in use at exit: 1,024 bytes in 1 blocks
==6678==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==6678== 
==6678== LEAK SUMMARY:
==6678==    definitely lost: 0 bytes in 0 blocks
==6678==    indirectly lost: 0 bytes in 0 blocks
==6678==      possibly lost: 0 bytes in 0 blocks
==6678==    still reachable: 1,024 bytes in 1 blocks
==6678==         suppressed: 0 bytes in 0 blocks
==6678== Rerun with --leak-check=full to see details of leaked memory
==6678== 
==6678== For lists of detected and suppressed errors, rerun with: -s
==6678== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
//gcc -fsanitize=address -Og -g -o Stack_Out-Of-Bounds_asan Stack_Out-Of-Bounds.c && ./Stack_Out-Of-Bounds_asan
=================================================================
==6768==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffdc1bb0d58 at pc 0x5b7cf399f34c bp 0x7ffdc1bb0cf0 sp 0x7ffdc1bb0ce0
WRITE of size 4 at 0x7ffdc1bb0d58 thread T0
    #0 0x5b7cf399f34b in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Stack_Out-Of-Bounds.c:4
    #1 0x79dea0c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x79dea0c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b7cf399f164 in _start (/home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Stack_Out-Of-Bounds_asan+0x1164)

Address 0x7ffdc1bb0d58 is located in stack of thread T0 at offset 88 in frame
    #0 0x5b7cf399f238 in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Stack_Out-Of-Bounds.c:2

  This frame has 1 object(s):
    [48, 88) 'array' (line 3) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Stack_Out-Of-Bounds.c:4 in main
Shadow bytes around the buggy address:
  0x10003836e150: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e160: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e170: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e190: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10003836e1a0: f1 f1 f1 f1 f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3
  0x10003836e1b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e1c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e1e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003836e1f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==6768==ABORTING
```
### Global out-of-bounds
#### Source code
```
#include <stdio.h>
int global[5];
int main() {
    global[5] = 100; // Accessing out-of-bounds array index
    return 0;
}
```
//gcc -Og -g -o Global_Out-Of-Bounds Global_Out-Of-Bounds.c
#### Valgrind Report
```
//valgrind ./Global_Out-Of-Bounds
==7315== Memcheck, a memory error detector
==7315== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7315== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7315== Command: ./Global_Out-Of-Bounds
==7315== 
==7315== 
==7315== HEAP SUMMARY:
==7315==     in use at exit: 0 bytes in 0 blocks
==7315==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==7315== 
==7315== All heap blocks were freed -- no leaks are possible
==7315== 
==7315== For lists of detected and suppressed errors, rerun with: -s
==7315== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
//gcc -fsanitize=address -Og -g -o Global_Out-Of-Bounds_asan Global_Out-Of-Bounds.c && ./Global_Out-Of-Bounds_asan
=================================================================
==7324==ERROR: AddressSanitizer: global-buffer-overflow on address 0x566d7e7d00b4 at pc 0x566d7e7cd20c bp 0x7ffc160cb940 sp 0x7ffc160cb930
WRITE of size 4 at 0x566d7e7d00b4 thread T0
    #0 0x566d7e7cd20b in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Global_Out-Of-Bounds.c:4
    #1 0x71ffcb229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x71ffcb229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x566d7e7cd104 in _start (/home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Global_Out-Of-Bounds_asan+0x1104)

0x566d7e7d00b4 is located 0 bytes to the right of global variable 'global' defined in 'Global_Out-Of-Bounds.c:2:5' (0x566d7e7d00a0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Global_Out-Of-Bounds.c:4 in main
Shadow bytes around the buggy address:
  0x0ace2fcf1fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf1fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf1fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf1ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf2000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ace2fcf2010: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0ace2fcf2020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf2030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf2040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf2050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ace2fcf2060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==7324==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));
    free(ptr);
    *ptr = 10; // Accessing memory after it has been freed
    return 0;
}
```
//gcc -Og -g -o Use-After-Free Use-After-Free.c
#### Valgrind Report
```
//valgrind ./Use-After-Free
==7788== Memcheck, a memory error detector
==7788== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7788== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7788== Command: ./Use-After-Free
==7788== 
==7788== Invalid write of size 4
==7788==    at 0x109183: main (Use-After-Free.c:6)
==7788==  Address 0x4a96040 is 0 bytes inside a block of size 4 free'd
==7788==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7788==    by 0x109182: main (Use-After-Free.c:5)
==7788==  Block was alloc'd at
==7788==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7788==    by 0x109177: main (Use-After-Free.c:4)
==7788== 
==7788== 
==7788== HEAP SUMMARY:
==7788==     in use at exit: 0 bytes in 0 blocks
==7788==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==7788== 
==7788== All heap blocks were freed -- no leaks are possible
==7788== 
==7788== For lists of detected and suppressed errors, rerun with: -s
==7788== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
//gcc -fsanitize=address -Og -g -o Use-After-Free_asan Use-After-Free.c && ./Use-After-Free_asan
=================================================================
==7797==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5e6177c1e217 bp 0x7ffd4a3dbed0 sp 0x7ffd4a3dbec0
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x5e6177c1e216 in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Free.c:6
    #1 0x7509d1029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7509d1029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5e6177c1e104 in _start (/home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Free_asan+0x1104)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7509d14b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5e6177c1e1e2 in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Free.c:5

previously allocated by thread T0 here:
    #0 0x7509d14b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5e6177c1e1d7 in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Free.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Free.c:6 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==7797==ABORTING
```
### Use-after-return
#### Source code
```
#include <stdio.h>

int *getPointer() {
    int x = 42; // Local variable
    return &x; // Return the address of a local variable
}


int main() {
    int *ptr = getPointer(); // Get the pointer from the function
    printf("Value: %d\n", *ptr); // Use after return 

    return 0;
}
```
//gcc -Og -g -o Use-After-Return Use-After-Return.c
#### Valgrind Report
```
//valgrind ./Use-After-Return
==9047== Memcheck, a memory error detector
==9047== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9047== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==9047== Command: ./Use-After-Return
==9047== 
==9047== Invalid read of size 4
==9047==    at 0x109165: main (Use-After-Return.c:11)
==9047==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==9047== 
==9047== 
==9047== Process terminating with default action of signal 11 (SIGSEGV)
==9047==  Access not within mapped region at address 0x0
==9047==    at 0x109165: main (Use-After-Return.c:11)
==9047==  If you believe this happened as a result of a stack
==9047==  overflow in your program's main thread (unlikely but
==9047==  possible), you can try to increase the size of the
==9047==  main thread stack using the --main-stacksize= flag.
==9047==  The main thread stack size used in this run was 8388608.
==9047== 
==9047== HEAP SUMMARY:
==9047==     in use at exit: 0 bytes in 0 blocks
==9047==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==9047== 
==9047== All heap blocks were freed -- no leaks are possible
==9047== 
==9047== For lists of detected and suppressed errors, rerun with: -s
==9047== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
//gcc -fsanitize=address -Og -g -o Use-After-Return_asan Use-After-Return.c && ./Use-After-Return_asan
Use-After-Return.c: In function ‘getPointer’:
Use-After-Return.c:5:12: warning: function returns address of local variable [-Wreturn-local-addr]
    5 |     return &x; // Return the address of a local variable
      |            ^~
AddressSanitizer:DEADLYSIGNAL
=================================================================
==9068==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5abe7e5f9224 bp 0x000000000001 sp 0x7ffebe1190c0 T0)
==9068==The signal is caused by a READ memory access.
==9068==Hint: address points to the zero page.
    #0 0x5abe7e5f9224 in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Return.c:11
    #1 0x77381c029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x77381c029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5abe7e5f9124 in _start (/home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Return_asan+0x1124)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab5/Use-After-Return.c:11 in main
==9068==ABORTING
```
## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
int main(void)
{
  int a[8];
  int b[8];
  a[16] = 16;
  printf("a[16]: %d\n", a[16]);  
  printf("b[0]: %d\n", b[0]);   
  return 0;
}
```
### Why
ASan 可能無法偵測到該錯誤，因為out-of-bounds“a”寫入會覆蓋相鄰的adjacent stack-allocated array “b”，從而繞過堆疊分配的redzone保護。

