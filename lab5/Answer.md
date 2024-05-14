# Answer

Name: 陳志名
ID: 511558014

## Test Valgrind and ASan

### Environment and version
valgrind-3.20.0
gcc version 10.2.1 20210110 (Debian 10.2.1-6)

### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |      V   |  V   |
| Stack out-of-bounds  |      X   |  V   |
| Global out-of-bounds |      X   |  V   |
| Use-after-free       |      V   |  V   |
| Use-after-return     |      V   |  V   |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(5 * sizeof(int));
    ptr[5] = 10; 
    free(ptr);
    return 0;
}
```
#### Valgrind Report
```
==2122== Memcheck, a memory error detector
==2122== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==2122== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==2122== Command: ./Heap_out-of-bounds
==2122== 
==2122== Invalid write of size 4
==2122==    at 0x109156: main (Heap_out-of-bounds.c:5)
==2122==  Address 0x4a4b054 is 0 bytes after a block of size 20 alloc'd
==2122==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2122==    by 0x109152: main (Heap_out-of-bounds.c:4)
==2122== 
==2122== 
==2122== HEAP SUMMARY:
==2122==     in use at exit: 0 bytes in 0 blocks
==2122==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==2122== 
==2122== All heap blocks were freed -- no leaks are possible
==2122== 
==2122== For lists of detected and suppressed errors, rerun with: -s
==2122== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==5758==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x5577de82c1c7 bp 0x7ffd37d7b170 sp 0x7ffd37d7b168 
WRITE of size 4 at 0x603000000054 thread T0                                  
    #0 0x5577de82c1c6 in main /root/Desktop/lab5/Heap_out-of-bounds.c:5
    #1 0x7f67843356c9 in __libc_start_call_main ../sysdeps/x86/libc-start.c:58
    #2 0x7f6784335784 in __libc_start_main_impl ../sysdeps/nptl/libc_start_call_main.h:360
    #3 0x5577de82c0b0 in _start (/root/Desktop/lab5/Heap_out-of-bounds_asan+0x10b0)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)                                                          
allocated by thread T0 here:                                                 
    #0 0x7f6784599e8f in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5577de82c182 in main /root/Desktop/lab5/Heap_out-of-bounds.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /root/Desktop/lab5/Heap_out-of-bounds.c:5 in main
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
==5758==ABORTING

```
### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int arr[5];
    arr[5] = 10; 
    return 0;
}
```
#### Valgrind Report
```
==4281== Memcheck, a memory error detector
==4281== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==4281== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==4281== Command: ./Stack_out-of-bounds
==4281== 
==4281== 
==4281== HEAP SUMMARY:
==4281==     in use at exit: 0 bytes in 0 blocks
==4281==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==4281== 
==4281== All heap blocks were freed -- no leaks are possible
==4281== 
==4281== For lists of detected and suppressed errors, rerun with: -s
==4281== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==5786==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fff0af375e4 at pc 0x562beac86234 bp 0x7fff0af375a0 sp 0x7fff0af37598
WRITE of size 4 at 0x7fff0af375e4 thread T0                                  
    #0 0x562beac86233 in main /root/Desktop/lab5/Stack_out-of-bounds.c:5
    #1 0x7f28b834f6c9 in __libc_start_call_main ../sysdeps/x86/libc-start.c:58
    #2 0x7f28b834f784 in __libc_start_main_impl ../sysdeps/nptl/libc_start_call_main.h:360
    #3 0x562beac860a0 in _start (/root/Desktop/lab5/Stack_out-of-bounds_asan+0x10a0)

Address 0x7fff0af375e4 is located in stack of thread T0 at offset 52 in frame
    #0 0x562beac86174 in main /root/Desktop/lab5/Stack_out-of-bounds.c:3

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable                                                                        
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /root/Desktop/lab5/Stack_out-of-bounds.c:5 in main
Shadow bytes around the buggy address:
  0x1000615dee60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615dee70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615dee80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615dee90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615deea0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x1000615deeb0: 00 00 00 00 00 00 f1 f1 f1 f1 00 00[04]f3 f3 f3
  0x1000615deec0: f3 f3 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615deed0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615deee0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615deef0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000615def00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==5786==ABORTING
```
### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int global[5];

int main() {
    global[5] = 10; 
    return 0;
}
```
#### Valgrind Report
```
==6024== Memcheck, a memory error detector
==6024== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==6024== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==6024== Command: ./Global_out-of-bounds
==6024== 
==6024== 
==6024== HEAP SUMMARY:
==6024==     in use at exit: 0 bytes in 0 blocks
==6024==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==6024== 
==6024== All heap blocks were freed -- no leaks are possible
==6024== 
==6024== For lists of detected and suppressed errors, rerun with: -s
==6024== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==5811==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55d944b8e0f4 at pc 0x55d944b8b1b4 bp 0x7ffca91a06a0 sp 0x7ffca91a0698 
WRITE of size 4 at 0x55d944b8e0f4 thread T0                                  
    #0 0x55d944b8b1b3 in main /root/Desktop/lab5/Global_out-of-bounds.c:6
    #1 0x7f191367a6c9 in __libc_start_call_main ../sysdeps/x86/libc-start.c:58
    #2 0x7f191367a784 in __libc_start_main_impl ../sysdeps/nptl/libc_start_call_main.h:360
    #3 0x55d944b8b0b0 in _start (/root/Desktop/lab5/Global_out-of-bounds_asan+0x10b0)

0x55d944b8e0f4 is located 0 bytes to the right of global variable 'global' defined in 'Global_out-of-bounds.c:3:5' (0x55d944b8e0e0) of size 20            
SUMMARY: AddressSanitizer: global-buffer-overflow /root/Desktop/lab5/Global_out-of-bounds.c:6 in main
Shadow bytes around the buggy address:
  0x0abba8969bc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969bd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969be0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969bf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969c00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0abba8969c10: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00[04]f9
  0x0abba8969c20: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969c30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969c40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969c50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abba8969c60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==5811==ABORTING

```
### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));
    free(ptr);
    *ptr = 10; 
    return 0;
}
```
#### Valgrind Report
```
==7021== Memcheck, a memory error detector
==7021== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==7021== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==7021== Command: ./Use-after-free
==7021== 
==7021== Invalid write of size 4
==7021==    at 0x10915B: main (Use-after-free.c:6)
==7021==  Address 0x4a4b040 is 0 bytes inside a block of size 4 free'd
==7021==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7021==    by 0x10915A: main (Use-after-free.c:5)
==7021==  Block was alloc'd at
==7021==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7021==    by 0x10914F: main (Use-after-free.c:4)
==7021== 
==7021== 
==7021== HEAP SUMMARY:
==7021==     in use at exit: 0 bytes in 0 blocks
==7021==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==7021== 
==7021== All heap blocks were freed -- no leaks are possible
==7021== 
==7021== For lists of detected and suppressed errors, rerun with: -s
==7021== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==5833==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x56474ad9c1bf bp 0x7ffc9fa195f0 sp 0x7ffc9fa195e8 
WRITE of size 4 at 0x602000000010 thread T0                                  
    #0 0x56474ad9c1be in main /root/Desktop/lab5/Use-after-free.c:6
    #1 0x7f162b3496c9 in __libc_start_call_main ../sysdeps/x86/libc-start.c:58
    #2 0x7f162b349784 in __libc_start_main_impl ../sysdeps/nptl/libc_start_call_main.h:360
    #3 0x56474ad9c0b0 in _start (/root/Desktop/lab5/Use-after-free_asan+0x10b0)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)                                                                 
freed by thread T0 here:                                                     
    #0 0x7f162b5adb6f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:123
    #1 0x56474ad9c18a in main /root/Desktop/lab5/Use-after-free.c:5

previously allocated by thread T0 here:
    #0 0x7f162b5ade8f in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56474ad9c17f in main /root/Desktop/lab5/Use-after-free.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /root/Desktop/lab5/Use-after-free.c:6 in main
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
==5833==ABORTING

```
### Use-after-return
#### Source code
```
#include <stdio.h>

int *getPointer() {
    int x = 42; 
    return &x; 
}

int main() {
    int *ptr = getPointer(); 
    printf("Value: %d\n", *ptr);

    return 0;
}
```
#### Valgrind Report
```
==8022== Memcheck, a memory error detector
==8022== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==8022== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==8022== Command: ./Use-after-return
==8022== 
==8022== Invalid read of size 4
==8022==    at 0x109149: main (Use-after-return.c:10)
==8022==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==8022== 
==8022== 
==8022== Process terminating with default action of signal 11 (SIGSEGV)
==8022==  Access not within mapped region at address 0x0
==8022==    at 0x109149: main (Use-after-return.c:10)
==8022==  If you believe this happened as a result of a stack
==8022==  overflow in your program's main thread (unlikely but
==8022==  possible), you can try to increase the size of the
==8022==  main thread stack using the --main-stacksize= flag.
==8022==  The main thread stack size used in this run was 8388608.
==8022== 
==8022== HEAP SUMMARY:
==8022==     in use at exit: 0 bytes in 0 blocks
==8022==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==8022== 
==8022== All heap blocks were freed -- no leaks are possible
==8022== 
==8022== For lists of detected and suppressed errors, rerun with: -s
==8022== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
zsh: segmentation fault  valgrind ./Use-after-return

```
### ASan Report
```
=================================================================
==7099==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5636e0fbb1b8 bp 0x000000000001 sp 0x7ffe89c3a330 T0)                        
==7099==The signal is caused by a READ memory access.                        
==7099==Hint: address points to the zero page.
    #0 0x5636e0fbb1b8 in main /root/Desktop/lab5/Use-after-return.c:10
    #1 0x7f7aaadaf6c9 in __libc_start_call_main ../sysdeps/x86/libc-start.c:58
    #2 0x7f7aaadaf784 in __libc_start_main_impl ../sysdeps/nptl/libc_start_call_main.h:360
    #3 0x5636e0fbb0c0 in _start (/root/Desktop/lab5/Use-after-return_asan+0x10c0)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /root/Desktop/lab5/Use-after-return.c:10 in main
==7099==ABORTING
```
## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
int main(void)
{
  int a[8];
  int b[8];

  a[16] = 100;

  printf("a[16]: %d\n", a[16]);  
  printf("b[0]: %d\n", b[0]);    

  b[16] = 100;
  printf("b[16]: %d\n", b[16]);   


  return 0;
}
```
### Why

將 a 陣列的最後一個元素放到 b 陣列的第一個位置上，而且 a 的後面再加 32 位元組剛好到達 b 的開始位置。因為這樣沒有超出內存保護區，所以ASAN不會檢測到任何問題。
