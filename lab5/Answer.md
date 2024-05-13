# Answer

Name: 陳谷安
ID: 512558008

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    yes   |  yes |
| Stack out-of-bounds  |    no    |  yes |
| Global out-of-bounds |    no    |  yes |
| Use-after-free       |    yes   |  yes |
| Use-after-return     |    no    |  yes |

### Heap out-of-bounds
#### Source code
```

```
#### Valgrind Report
```
==7216== Memcheck, a memory error detector
==7216== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7216== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==7216== Command: ./heap
==7216== 
==7216== Invalid write of size 4
==7216==    at 0x109257: main (in /home/ubuntu/桌面/Lab5/heap)
==7216==  Address 0x4db2c94 is 0 bytes after a block of size 20 alloc'd
==7216==    at 0x483C583: operator new[](unsigned long) (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==7216==    by 0x10921E: main (in /home/ubuntu/桌面/Lab5/heap)
==7216== 
array[0] = 0
array[1] = 1
array[2] = 2
array[3] = 3
array[4] = 4
==7216== Invalid read of size 4
==7216==    at 0x1092B3: main (in /home/ubuntu/桌面/Lab5/heap)
==7216==  Address 0x4db2c94 is 0 bytes after a block of size 20 alloc'd
==7216==    at 0x483C583: operator new[](unsigned long) (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==7216==    by 0x10921E: main (in /home/ubuntu/桌面/Lab5/heap)
==7216== 
array[5] = 10
==7216== 
==7216== HEAP SUMMARY:
==7216==     in use at exit: 0 bytes in 0 blocks
==7216==   total heap usage: 3 allocs, 3 frees, 73,748 bytes allocated
==7216== 
==7216== All heap blocks were freed -- no leaks are possible
==7216== 
==7216== For lists of detected and suppressed errors, rerun with: -s
==7216== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==7273==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000024 at pc 0x55fd72cc93c6 bp 0x7fff1a6cdb00 sp 0x7fff1a6cdaf0
WRITE of size 4 at 0x603000000024 thread T0
    #0 0x55fd72cc93c5 in main /home/ubuntu/桌面/Lab5/heap.cpp:12
    #1 0x7f1a631a6082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55fd72cc924d in _start (/home/ubuntu/桌面/Lab5/heap2+0x124d)

0x603000000024 is located 0 bytes to the right of 20-byte region [0x603000000010,0x603000000024)
allocated by thread T0 here:
    #0 0x7f1a63771cc7 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:102
    #1 0x55fd72cc931e in main /home/ubuntu/桌面/Lab5/heap.cpp:5
    #2 0x7f1a631a6082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/ubuntu/桌面/Lab5/heap.cpp:12 in main
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
==7273==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <iostream>

int main() {
    int stackArray[5] = {0, 1, 2, 3, 4};

    stackArray[5] = 10; 
    
    int value = stackArray[5]; 
    std::cout << "Value: " << value << std::endl;

    return 0;
}
```
#### Valgrind Report
```
==7473== Memcheck, a memory error detector
==7473== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7473== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==7473== Command: ./stack
==7473== 
Value: 10
==7473== 
==7473== HEAP SUMMARY:
==7473==     in use at exit: 0 bytes in 0 blocks
==7473==   total heap usage: 2 allocs, 2 frees, 73,728 bytes allocated
==7473== 
==7473== All heap blocks were freed -- no leaks are possible
==7473== 
==7473== For lists of detected and suppressed errors, rerun with: -s
==7473== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==7579==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc13cc6c34 at pc 0x55a21a3024f5 bp 0x7ffc13cc6be0 sp 0x7ffc13cc6bd0
WRITE of size 4 at 0x7ffc13cc6c34 thread T0
    #0 0x55a21a3024f4 in main /home/ubuntu/桌面/Lab5/stack.cpp:6
    #1 0x7f6ab7c8a082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55a21a30222d in _start (/home/ubuntu/桌面/Lab5/stack2+0x122d)

Address 0x7ffc13cc6c34 is located in stack of thread T0 at offset 52 in frame
    #0 0x55a21a3022f8 in main /home/ubuntu/桌面/Lab5/stack.cpp:3

  This frame has 1 object(s):
    [32, 52) 'stackArray' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/ubuntu/桌面/Lab5/stack.cpp:6 in main
Shadow bytes around the buggy address:
  0x100002790d30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790d40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790d50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790d60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790d70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100002790d80: f1 f1 f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00 00 00
  0x100002790d90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790da0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790db0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790dc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100002790dd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==7579==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <iostream>

int globalArray[5] = {0, 1, 2, 3, 4};

int main() {
   
    globalArray[5] = 10; 

    
    int value = globalArray[5]; 
    std::cout << "Value: " << value << std::endl;

    return 0;
}

```
#### Valgrind Report
```
==8127== Memcheck, a memory error detector
==8127== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8127== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==8127== Command: ./global
==8127== 
Value: 10
==8127== 
==8127== HEAP SUMMARY:
==8127==     in use at exit: 0 bytes in 0 blocks
==8127==   total heap usage: 2 allocs, 2 frees, 73,728 bytes allocated
==8127== 
==8127== All heap blocks were freed -- no leaks are possible
==8127== 
==8127== For lists of detected and suppressed errors, rerun with: -s
==8127== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8169==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55aee9bcd034 at pc 0x55aee9bca2ef bp 0x7ffd3db39a70 sp 0x7ffd3db39a60
WRITE of size 4 at 0x55aee9bcd034 thread T0
    #0 0x55aee9bca2ee in main /home/ubuntu/桌面/Lab5/global.cpp:7
    #1 0x7f0fafe61082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55aee9bca1ed in _start (/home/ubuntu/桌面/Lab5/global2+0x11ed)

0x55aee9bcd034 is located 0 bytes to the right of global variable 'globalArray' defined in 'global.cpp:3:5' (0x55aee9bcd020) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/ubuntu/桌面/Lab5/global.cpp:7 in main
Shadow bytes around the buggy address:
  0x0ab65d3719b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab65d3719c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab65d3719d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab65d3719e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab65d3719f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ab65d371a00: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0ab65d371a10: 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab65d371a20: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab65d371a30: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab65d371a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab65d371a50: 00 00 00 00 00 00 00 00 00 00 00 00 01 f9 f9 f9
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
==8169==ABORTING
```

### Use-after-free
#### Source code
```
#include <iostream>

int main() {
    int* ptr = new int(10); 
    delete ptr; 
    
    *ptr = 20; 
    int value = *ptr; 
    std::cout << "Value: " << value << std::endl;

    return 0;
}

```
#### Valgrind Report
```
==8413== Memcheck, a memory error detector
==8413== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8413== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==8413== Command: ./free
==8413== 
==8413== Invalid write of size 4
==8413==    at 0x109243: main (in /home/ubuntu/桌面/Lab5/free)
==8413==  Address 0x4db2c80 is 0 bytes inside a block of size 4 free'd
==8413==    at 0x483D1CF: operator delete(void*, unsigned long) (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==8413==    by 0x10923E: main (in /home/ubuntu/桌面/Lab5/free)
==8413==  Block was alloc'd at
==8413==    at 0x483BE63: operator new(unsigned long) (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==8413==    by 0x10921E: main (in /home/ubuntu/桌面/Lab5/free)
==8413== 
==8413== Invalid read of size 4
==8413==    at 0x10924D: main (in /home/ubuntu/桌面/Lab5/free)
==8413==  Address 0x4db2c80 is 0 bytes inside a block of size 4 free'd
==8413==    at 0x483D1CF: operator delete(void*, unsigned long) (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==8413==    by 0x10923E: main (in /home/ubuntu/桌面/Lab5/free)
==8413==  Block was alloc'd at
==8413==    at 0x483BE63: operator new(unsigned long) (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==8413==    by 0x10921E: main (in /home/ubuntu/桌面/Lab5/free)
==8413== 
Value: 20
==8413== 
==8413== HEAP SUMMARY:
==8413==     in use at exit: 0 bytes in 0 blocks
==8413==   total heap usage: 3 allocs, 3 frees, 73,732 bytes allocated
==8413== 
==8413== All heap blocks were freed -- no leaks are possible
==8413== 
==8413== For lists of detected and suppressed errors, rerun with: -s
==8413== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8456==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5635818ff38d bp 0x7ffdf62ce950 sp 0x7ffdf62ce940
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x5635818ff38c in main /home/ubuntu/桌面/Lab5/free.cpp:7
    #1 0x7f649500c082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5635818ff22d in _start (/home/ubuntu/桌面/Lab5/free2+0x122d)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f64955d8bbf in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:172
    #1 0x5635818ff355 in main /home/ubuntu/桌面/Lab5/free.cpp:5
    #2 0x7f649500c082 in __libc_start_main ../csu/libc-start.c:308

previously allocated by thread T0 here:
    #0 0x7f64955d7b57 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:99
    #1 0x5635818ff2fe in main /home/ubuntu/桌面/Lab5/free.cpp:4
    #2 0x7f649500c082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-use-after-free /home/ubuntu/桌面/Lab5/free.cpp:7 in main
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
==8456==ABORTING
```

### Use-after-return
#### Source code
```
#include <iostream>

int* dangerousFunction() {
    int localValue = 10;
    return &localValue; 
}

int main() {
    int* ptr = dangerousFunction(); 
    
    *ptr = 20; 
    int value = *ptr; 
    std::cout << "Value: " << value << std::endl;

    return 0;
}

```
#### Valgrind Report
```
==8587== Memcheck, a memory error detector
==8587== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8587== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==8587== Command: ./return
==8587== 
==8587== Invalid write of size 4
==8587==    at 0x10923F: main (in /home/ubuntu/桌面/Lab5/return)
==8587==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==8587== 
==8587== 
==8587== Process terminating with default action of signal 11 (SIGSEGV)
==8587==  Access not within mapped region at address 0x0
==8587==    at 0x10923F: main (in /home/ubuntu/桌面/Lab5/return)
==8587==  If you believe this happened as a result of a stack
==8587==  overflow in your program's main thread (unlikely but
==8587==  possible), you can try to increase the size of the
==8587==  main thread stack using the --main-stacksize= flag.
==8587==  The main thread stack size used in this run was 8388608.
==8587== 
==8587== HEAP SUMMARY:
==8587==     in use at exit: 0 bytes in 0 blocks
==8587==   total heap usage: 1 allocs, 1 frees, 72,704 bytes allocated
==8587== 
==8587== All heap blocks were freed -- no leaks are possible
==8587== 
==8587== For lists of detected and suppressed errors, rerun with: -s
==8587== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==8672==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x56242a3c6447 bp 0x7ffc329bfb50 sp 0x7ffc329bfb40 T0)
==8672==The signal is caused by a WRITE memory access.
==8672==Hint: address points to the zero page.
    #0 0x56242a3c6447 in main /home/ubuntu/桌面/Lab5/return.cpp:11
    #1 0x7f28e2f0b082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56242a3c622d in _start (/home/ubuntu/桌面/Lab5/return2+0x122d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/ubuntu/桌面/Lab5/return.cpp:11 in main
==8672==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <iostream>

int main() {
    int a[8] = {1, 2, 3, 4, 5, 6, 7, 8};
    int b[8] = {11, 12, 13, 14, 15, 16, 17, 18};
    a[16] = 10;  

    std::cout << a[16] << std::endl;
    return 0;
}
```
### Why
不能，ASan 因為沒有越過redzone 所以沒有檢測到問題。
