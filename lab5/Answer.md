# Answer

Name: 
ID: 

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     O    |   O  |
| Stack out-of-bounds  |     X    |   O  |
| Global out-of-bounds |     X    |   O  |
| Use-after-free       |     O    |   O  |
| Use-after-return     |     X    |   O  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int *)malloc(5 * sizeof(int));
    arr[5] = 10; 
    printf("%d\n", arr[5]);
    free(arr);
    return 0;
}
```

#### Valgrind Report
```
==7895== Memcheck, a memory error detector
==7895== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7895== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7895== Command: ./heap
==7895== 
==7895== Invalid write of size 4
==7895==    at 0x1091AB: main (in /home/ray/Desktop/lab5/demo/heap)
==7895==  Address 0x4a96054 is 0 bytes after a block of size 20 alloc'd
==7895==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7895==    by 0x10919E: main (in /home/ray/Desktop/lab5/demo/heap)
==7895== 
==7895== Invalid read of size 4
==7895==    at 0x1091B9: main (in /home/ray/Desktop/lab5/demo/heap)
==7895==  Address 0x4a96054 is 0 bytes after a block of size 20 alloc'd
==7895==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7895==    by 0x10919E: main (in /home/ray/Desktop/lab5/demo/heap)
==7895== 
10
==7895== 
==7895== HEAP SUMMARY:
==7895==     in use at exit: 0 bytes in 0 blocks
==7895==   total heap usage: 2 allocs, 2 frees, 1,044 bytes allocated
==7895== 
==7895== All heap blocks were freed -- no leaks are possible
==7895== 
==7895== For lists of detected and suppressed errors, rerun with: -s
==7895== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==7911==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x5a3896d922a2 bp 0x7ffcf8afd5a0 sp 0x7ffcf8afd590
WRITE of size 4 at 0x603000000054 thread T0
    #0 0x5a3896d922a1 in main (/home/ray/Desktop/lab5/demo/heap+0x12a1)
    #1 0x71f020a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x71f020a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5a3896d92184 in _start (/home/ray/Desktop/lab5/demo/heap+0x1184)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x71f020eb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5a3896d9225e in main (/home/ray/Desktop/lab5/demo/heap+0x125e)
    #2 0x71f020a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/ray/Desktop/lab5/demo/heap+0x12a1) in main
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
==7911==ABORTING

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int arr[5];
    arr[5] = 10;
    printf("%d\n", arr[5]); 
    return 0;
}
```
#### Valgrind Report
```
==7991== Memcheck, a memory error detector
==7991== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7991== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7991== Command: ./stack
==7991== 
10
==7991== 
==7991== HEAP SUMMARY:
==7991==     in use at exit: 0 bytes in 0 blocks
==7991==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==7991== 
==7991== All heap blocks were freed -- no leaks are possible
==7991== 
==7991== For lists of detected and suppressed errors, rerun with: -s
==7991== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==8054==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe221f78f4 at pc 0x59c450ec22fc bp 0x7ffe221f78b0 sp 0x7ffe221f78a0
WRITE of size 4 at 0x7ffe221f78f4 thread T0
    #0 0x59c450ec22fb in main (/home/ray/Desktop/lab5/demo/stack+0x12fb)
    #1 0x76f5d7229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x76f5d7229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x59c450ec2164 in _start (/home/ray/Desktop/lab5/demo/stack+0x1164)

Address 0x7ffe221f78f4 is located in stack of thread T0 at offset 52 in frame
    #0 0x59c450ec2238 in main (/home/ray/Desktop/lab5/demo/stack+0x1238)

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/ray/Desktop/lab5/demo/stack+0x12fb) in main
Shadow bytes around the buggy address:
  0x100044436ec0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436ed0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436ee0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436ef0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100044436f10: 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00[04]f3
  0x100044436f20: f3 f3 f3 f3 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436f30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436f40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436f50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044436f60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==8054==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int globalArr[5];

int main() {
    globalArr[5] = 10;
    printf("%d\n", globalArr[5]); 
    return 0;
}
```
#### Valgrind Report
```
==8084== Memcheck, a memory error detector
==8084== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8084== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8084== Command: ./out_of_bound
==8084== 
10
==8084== 
==8084== HEAP SUMMARY:
==8084==     in use at exit: 0 bytes in 0 blocks
==8084==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==8084== 
==8084== All heap blocks were freed -- no leaks are possible
==8084== 
==8084== For lists of detected and suppressed errors, rerun with: -s
==8084== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==8157==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5b4924bd30f4 at pc 0x5b4924bd022b bp 0x7ffe79457540 sp 0x7ffe79457530
WRITE of size 4 at 0x5b4924bd30f4 thread T0
    #0 0x5b4924bd022a in main (/home/ray/Desktop/lab5/demo/out_of_bound+0x122a)
    #1 0x79e98ea29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x79e98ea29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b4924bd0124 in _start (/home/ray/Desktop/lab5/demo/out_of_bound+0x1124)

0x5b4924bd30f4 is located 0 bytes to the right of global variable 'globalArr' defined in 'out_of_bound.c:3:5' (0x5b4924bd30e0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/ray/Desktop/lab5/demo/out_of_bound+0x122a) in main
Shadow bytes around the buggy address:
  0x0b69a49725c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a49725d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a49725e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a49725f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a4972600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0b69a4972610: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00[04]f9
  0x0b69a4972620: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a4972630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a4972640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a4972650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b69a4972660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==8157==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));
    free(ptr);
    *ptr = 10; 
    printf("%d\n", *ptr); 
    return 0;
}
```
#### Valgrind Report
```
==8246== Memcheck, a memory error detector
==8246== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8246== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8246== Command: ./after_free
==8246== 
==8246== Invalid write of size 4
==8246==    at 0x1091B3: main (in /home/ray/Desktop/lab5/demo/after_free)
==8246==  Address 0x4a96040 is 0 bytes inside a block of size 4 free'd
==8246==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8246==    by 0x1091AE: main (in /home/ray/Desktop/lab5/demo/after_free)
==8246==  Block was alloc'd at
==8246==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8246==    by 0x10919E: main (in /home/ray/Desktop/lab5/demo/after_free)
==8246== 
==8246== Invalid read of size 4
==8246==    at 0x1091BD: main (in /home/ray/Desktop/lab5/demo/after_free)
==8246==  Address 0x4a96040 is 0 bytes inside a block of size 4 free'd
==8246==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8246==    by 0x1091AE: main (in /home/ray/Desktop/lab5/demo/after_free)
==8246==  Block was alloc'd at
==8246==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8246==    by 0x10919E: main (in /home/ray/Desktop/lab5/demo/after_free)
==8246== 
10
==8246== 
==8246== HEAP SUMMARY:
==8246==     in use at exit: 0 bytes in 0 blocks
==8246==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==8246== 
==8246== All heap blocks were freed -- no leaks are possible
==8246== 
==8246== For lists of detected and suppressed errors, rerun with: -s
==8246== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8367==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x59137444a286 bp 0x7ffc07a17ae0 sp 0x7ffc07a17ad0
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x59137444a285 in main (/home/ray/Desktop/lab5/demo/after_free+0x1285)
    #1 0x7e2635c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7e2635c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x59137444a164 in _start (/home/ray/Desktop/lab5/demo/after_free+0x1164)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7e26360b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x59137444a24e in main (/home/ray/Desktop/lab5/demo/after_free+0x124e)
    #2 0x7e2635c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7e26360b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x59137444a23e in main (/home/ray/Desktop/lab5/demo/after_free+0x123e)
    #2 0x7e2635c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/ray/Desktop/lab5/demo/after_free+0x1285) in main
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
==8367==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>

int *getPointer() {
    int localVar = 10;
    return &localVar;
}

int main() {
    int *ptr = getPointer();
    printf("%d\n", *ptr); 
    return 0;
}
```
#### Valgrind Report
```
==8433== Memcheck, a memory error detector
==8433== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8433== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8433== Command: ./after_return
==8433== 
==8433== Invalid read of size 4
==8433==    at 0x1091C4: main (in /home/ray/Desktop/lab5/demo/after_return)
==8433==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==8433== 
==8433== 
==8433== Process terminating with default action of signal 11 (SIGSEGV)
==8433==  Access not within mapped region at address 0x0
==8433==    at 0x1091C4: main (in /home/ray/Desktop/lab5/demo/after_return)
==8433==  If you believe this happened as a result of a stack
==8433==  overflow in your program's main thread (unlikely but
==8433==  possible), you can try to increase the size of the
==8433==  main thread stack using the --main-stacksize= flag.
==8433==  The main thread stack size used in this run was 8388608.
==8433== 
==8433== HEAP SUMMARY:
==8433==     in use at exit: 0 bytes in 0 blocks
==8433==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==8433== 
==8433== All heap blocks were freed -- no leaks are possible
==8433== 
==8433== For lists of detected and suppressed errors, rerun with: -s
==8433== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)

```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==8515==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5e0cd4c233ac bp 0x7ffcc73a38b0 sp 0x7ffcc73a38a0 T0)
==8515==The signal is caused by a READ memory access.
==8515==Hint: address points to the zero page.
    #0 0x5e0cd4c233ac in main (/home/ray/Desktop/lab5/demo/after_return+0x13ac)
    #1 0x72af31429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x72af31429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5e0cd4c23184 in _start (/home/ray/Desktop/lab5/demo/after_return+0x1184)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/ray/Desktop/lab5/demo/after_return+0x13ac) in main
==8515==ABORTING

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int *)malloc(5 * sizeof(int));
    int *ptr = &arr[6];
    *ptr = 10; 
    free(arr);
    return 0;
}

```
### Why
malloc函數分配了一個長度為5的整數陣列，後續指標ptr被設定為&arr[6],超出了陣列範圍，因此存取第6個元素可能會覆寫到redzone區域，由於這裡訪問了redzone之外的內存，因此繞過了asan的檢測
