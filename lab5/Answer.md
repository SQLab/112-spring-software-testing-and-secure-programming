# Answer

Name: 楊庚憲
ID: 512558014

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | YES      | YES  |
| Stack out-of-bounds  | NO       | YES  |
| Global out-of-bounds | NO       | YES  |
| Use-after-free       | YES      | YES  |
| Use-after-return     | YES      | YES  |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *array = (int *)malloc(5 * sizeof(int));
    for (int i = 0; i <= 5; i++) {  // 錯誤：訪問超過分配的範圍
        array[i] = i;
    }
    free(array);
    return 0;
}

```
#### Valgrind Report
```
==75764== Memcheck, a memory error detector
==75764== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==75764== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==75764== Command: ./Heap-out-of-bounds
==75764== 
==75764== Invalid write of size 4
==75764==    at 0x1091A3: main (in /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Heap-out-of-bounds)
==75764==  Address 0x4a51054 is 0 bytes after a block of size 20 alloc'd
==75764==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==75764==    by 0x10917E: main (in /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Heap-out-of-bounds)
==75764== 
==75764== 
==75764== HEAP SUMMARY:
==75764==     in use at exit: 0 bytes in 0 blocks
==75764==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==75764== 
==75764== All heap blocks were freed -- no leaks are possible
==75764== 
==75764== For lists of detected and suppressed errors, rerun with: -s
==75764== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==75792==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000024 at pc 0x55d3e855e220 bp 0x7ffe803bee40 sp 0x7ffe803bee30
WRITE of size 4 at 0x603000000024 thread T0
    #0 0x55d3e855e21f in main /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Heap-out-of-bounds.c:7
    #1 0x7f5a1b46f082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55d3e855e10d in _start (/home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Heap-out_asan+0x110d)

0x603000000024 is located 0 bytes to the right of 20-byte region [0x603000000010,0x603000000024)
allocated by thread T0 here:
    #0 0x7f5a1b74a808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x55d3e855e1da in main /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Heap-out-of-bounds.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Heap-out-of-bounds.c:7 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00[04]fa fa fa fa fa fa fa fa fa fa fa
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
==75792==ABORTING

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int array[5];
    for (int i = 0; i <= 5; i++) {  // 錯誤：訪問超過分配的範圍
        array[i] = i;
    }
    return 0;
}

```
#### Valgrind Report
```
==75835== Memcheck, a memory error detector
==75835== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==75835== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==75835== Command: ./Stack-out-of-bounds
==75835== 
==75835== 
==75835== HEAP SUMMARY:
==75835==     in use at exit: 0 bytes in 0 blocks
==75835==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==75835== 
==75835== All heap blocks were freed -- no leaks are possible
==75835== 
==75835== For lists of detected and suppressed errors, rerun with: -s
==75835== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==75845==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd3698b5a4 at pc 0x55edd0303292 bp 0x7ffd3698b560 sp 0x7ffd3698b550
WRITE of size 4 at 0x7ffd3698b5a4 thread T0
    #0 0x55edd0303291 in main /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Stack-out-of-bounds.c:6
    #1 0x7f50cbb4b082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55edd030310d in _start (/home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Stack-out_asan+0x110d)

Address 0x7ffd3698b5a4 is located in stack of thread T0 at offset 52 in frame
    #0 0x55edd03031d8 in main /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Stack-out-of-bounds.c:3

  This frame has 1 object(s):
    [32, 52) 'array' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Stack-out-of-bounds.c:6 in main
Shadow bytes around the buggy address:
  0x100026d29660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d29670: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d29680: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d29690: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d296a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x100026d296b0: f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00 00 00 00 00
  0x100026d296c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d296d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d296e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d296f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100026d29700: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==75845==ABORTING

```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int global_array[5];

int main() {
    for (int i = 0; i <= 5; i++) {  // 錯誤：訪問超過分配的範圍
        global_array[i] = i;
    }
    return 0;
}

```
#### Valgrind Report
```
==75879== Memcheck, a memory error detector
==75879== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==75879== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==75879== Command: ./Global-out-of-bounds
==75879== 
==75879== 
==75879== HEAP SUMMARY:
==75879==     in use at exit: 0 bytes in 0 blocks
==75879==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==75879== 
==75879== All heap blocks were freed -- no leaks are possible
==75879== 
==75879== For lists of detected and suppressed errors, rerun with: -s
==75879== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==76051==AddressSanitizer: libc interceptors initialized
|| `[0x10007fff8000, 0x7fffffffffff]` || HighMem    ||
|| `[0x02008fff7000, 0x10007fff7fff]` || HighShadow ||
|| `[0x00008fff7000, 0x02008fff6fff]` || ShadowGap  ||
|| `[0x00007fff8000, 0x00008fff6fff]` || LowShadow  ||
|| `[0x000000000000, 0x00007fff7fff]` || LowMem     ||
MemToShadow(shadow): 0x00008fff7000 0x000091ff6dff 0x004091ff6e00 0x02008fff6fff
redzone=16
max_redzone=2048
quarantine_size_mb=256M
thread_local_quarantine_size_kb=1024K
malloc_context_size=30
SHADOW_SCALE: 3
SHADOW_GRANULARITY: 8
SHADOW_OFFSET: 0x7fff8000
==76051==Installed the sigaction for signal 11
==76051==Installed the sigaction for signal 7
==76051==Installed the sigaction for signal 8
==76051==T0: stack [0x7ffcea787000,0x7ffceaf87000) size 0x800000; local=0x7ffceaf84f74
==76051==AddressSanitizer Init done

```

### Use-after-free
#### Source code
```
#include <stdlib.h>
#include <stdio.h>

int main() {
    int *array = (int *)malloc(5 * sizeof(int));
    free(array);
    array[0] = 1;  // 錯誤：釋放後使用
    return 0;
}

```
#### Valgrind Report
```
==76152== Memcheck, a memory error detector
==76152== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==76152== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==76152== Command: ./Use-after-free
==76152== 
==76152== Invalid write of size 4
==76152==    at 0x109193: main (in /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free)
==76152==  Address 0x4a51040 is 0 bytes inside a block of size 20 free'd
==76152==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==76152==    by 0x10918E: main (in /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free)
==76152==  Block was alloc'd at
==76152==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==76152==    by 0x10917E: main (in /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free)
==76152== 
==76152== 
==76152== HEAP SUMMARY:
==76152==     in use at exit: 0 bytes in 0 blocks
==76152==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==76152== 
==76152== All heap blocks were freed -- no leaks are possible
==76152== 
==76152== For lists of detected and suppressed errors, rerun with: -s
==76152== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==76169==AddressSanitizer: libc interceptors initialized
|| `[0x10007fff8000, 0x7fffffffffff]` || HighMem    ||
|| `[0x02008fff7000, 0x10007fff7fff]` || HighShadow ||
|| `[0x00008fff7000, 0x02008fff6fff]` || ShadowGap  ||
|| `[0x00007fff8000, 0x00008fff6fff]` || LowShadow  ||
|| `[0x000000000000, 0x00007fff7fff]` || LowMem     ||
MemToShadow(shadow): 0x00008fff7000 0x000091ff6dff 0x004091ff6e00 0x02008fff6fff
redzone=16
max_redzone=2048
quarantine_size_mb=256M
thread_local_quarantine_size_kb=1024K
malloc_context_size=30
SHADOW_SCALE: 3
SHADOW_GRANULARITY: 8
SHADOW_OFFSET: 0x7fff8000
==76169==Installed the sigaction for signal 11
==76169==Installed the sigaction for signal 7
==76169==Installed the sigaction for signal 8
==76169==T0: stack [0x7ffe9e67d000,0x7ffe9ee7d000) size 0x800000; local=0x7ffe9ee7b364
==76169==AddressSanitizer Init done
=================================================================
==76169==ERROR: AddressSanitizer: heap-use-after-free on address 0x603000000010 at pc 0x555b58029217 bp 0x7ffe9ee7b340 sp 0x7ffe9ee7b330
WRITE of size 4 at 0x603000000010 thread T0
    #0 0x555b58029216 in main /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free.c:7
    #1 0x7f4af8543082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x555b5802910d in _start (/home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free_asan+0x110d)

0x603000000010 is located 0 bytes inside of 20-byte region [0x603000000010,0x603000000024)
freed by thread T0 here:
    #0 0x7f4af881e40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x555b580291e2 in main /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free.c:6

previously allocated by thread T0 here:
    #0 0x7f4af881e808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x555b580291d7 in main /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-free.c:7 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa[fd]fd fd fa fa fa fa fa fa fa fa fa fa fa
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
==76169==ABORTING

```

### Use-after-return
#### Source code
```
#include <stdio.h>

int* getArray() {
    int array[5];
    return array;  // 错误：返回局部变量的指针
}

int main() {
    int *array = getArray();
    array[0] = 1;  // 错误：返回后使用
    printf("Array[0]: %d\n", array[0]);
    return 0;
}


```
#### Valgrind Report
```
==76298== Memcheck, a memory error detector
==76298== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==76298== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==76298== Command: ./Use-after-return
==76298== 
==76298== Invalid write of size 4
==76298==    at 0x1091BD: main (in /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-return)
==76298==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==76298== 
==76298== 
==76298== Process terminating with default action of signal 11 (SIGSEGV)
==76298==  Access not within mapped region at address 0x0
==76298==    at 0x1091BD: main (in /home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-return)
==76298==  If you believe this happened as a result of a stack
==76298==  overflow in your program's main thread (unlikely but
==76298==  possible), you can try to increase the size of the
==76298==  main thread stack using the --main-stacksize= flag.
==76298==  The main thread stack size used in this run was 8388608.
==76298== 
==76298== HEAP SUMMARY:
==76298==     in use at exit: 0 bytes in 0 blocks
==76298==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==76298== 
==76298== All heap blocks were freed -- no leaks are possible
==76298== 
==76298== For lists of detected and suppressed errors, rerun with: -s
==76298== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)

```
### ASan Report
```
=================================================================
==76289==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x558088a8736d bp 0x7fff6f661320 sp 0x7fff6f661310 T0)
==76289==The signal is caused by a WRITE memory access.
==76289==Hint: address points to the zero page.
    #0 0x558088a8736c in main (/home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-return+0x136c)
    #1 0x7f6b2e26f082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x558088a8716d in _start (/home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-return+0x116d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/kent/Desktop/112-spring-software-testing-and-secure-programming/lab5/demo/Use-after-return+0x136c) in main
==76289==ABORTING

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char buffer[10];
    char *ptr = (char*)malloc(10);

    // 設置一個小於 buffer 長度的 index
    int index = 12;

    // 在指針 ptr 的位置上進行寫入
    strcpy(ptr + index, "Hello");

    // 釋放分配的內存
    free(ptr);

    return 0;
}

```
### Why
這個程式中，我們有一個大小為 10 的 buffer，然後我們使用 malloc 分配了另外一個大小也為 10 的內存給指針 ptr。
接著，我們將 "Hello" 字符串寫入到了 ptr 的偏移為 12 的位置上，這超出了分配給 ptr 的空間。
