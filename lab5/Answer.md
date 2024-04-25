# Answer

Name: 柯俊亦
ID: 512558006

```bash
sudo apt install valgrind
valgrind --tool=$tool $program

xport LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH
```


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    V     |   V  |
| Stack out-of-bounds  |    X     |   V  |
| Global out-of-bounds |    X     |   V  |
| Use-after-free       |    V     |   V  |
| Use-after-return     |    V     |   V  |

### Heap out-of-bounds
#### Source code
```C
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(5 * sizeof(int));
    ptr[5] = 10; // Accessing out-of-bounds memory
    free(ptr);
    return 0;
}

//gcc -Og -g -o Heap_out-of-bounds Heap_out-of-bounds.c
```
#### Valgrind Report
```bash
# valgrind ./Heap_out-of-bounds

==23869== Memcheck, a memory error detector
==23869== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==23869== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==23869== Command: ./Heap_out-of-bounds
==23869== 
==23869== Invalid write of size 4
==23869==    at 0x10915A: main (Heap_out-of-bounds.c:5)
==23869==  Address 0x4a4d054 is 0 bytes after a block of size 20 alloc'd
==23869==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==23869==    by 0x109156: main (Heap_out-of-bounds.c:4)
==23869== 
==23869== 
==23869== HEAP SUMMARY:
==23869==     in use at exit: 0 bytes in 0 blocks
==23869==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==23869== 
==23869== All heap blocks were freed -- no leaks are possible
==23869== 
==23869== For lists of detected and suppressed errors, rerun with: -s
==23869== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```bash
# gcc -fsanitize=address -Og -g -o Heap_out-of-bounds_asan Heap_out-of-bounds.c && ./Heap_out-of-bounds_asan

=================================================================
==55803==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x564ea136e1cb bp 0x7fff49eef280 sp 0x7fff49eef278
WRITE of size 4 at 0x603000000054 thread T0                                                                                                                  
    #0 0x564ea136e1ca in main /home/kali/Desktop/fuzz/TEST/Heap_out-of-bounds.c:5
    #1 0x7f30a20456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f30a2045784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x564ea136e0b0 in _start (/home/kali/Desktop/fuzz/TEST/Heap_out-of-bounds_asan+0x10b0) (BuildId: 0b8df5f794ccff693aef32edbd4731d6cf83ce54)

0x603000000054 is located 0 bytes after 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:                                                                                                                                 
    #0 0x7f30a22d85bf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x564ea136e186 in main /home/kali/Desktop/fuzz/TEST/Heap_out-of-bounds.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/kali/Desktop/fuzz/TEST/Heap_out-of-bounds.c:5 in main
Shadow bytes around the buggy address:
  0x602ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x603000000000: fa fa 00 00 00 fa fa fa 00 00[04]fa fa fa fa fa
  0x603000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x603000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==55803==ABORTING
```

### Stack out-of-bounds
#### Source code
```C
#include <stdio.h>

int main() {
    int arr[5];
    arr[5] = 10; // Accessing out-of-bounds array index
    return 0;
}

//gcc -Og -g -o Stack_out-of-bounds Stack_out-of-bounds.c
```
#### Valgrind Report
```bash
# valgrind ./Stack_out-of-bounds

==25672== Memcheck, a memory error detector
==25672== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==25672== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==25672== Command: ./Stack_out-of-bounds
==25672== 
==25672== 
==25672== HEAP SUMMARY:
==25672==     in use at exit: 0 bytes in 0 blocks
==25672==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==25672== 
==25672== All heap blocks were freed -- no leaks are possible
==25672== 
==25672== For lists of detected and suppressed errors, rerun with: -s
==25672== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```bash
# gcc -fsanitize=address -Og -g -o Stack_out-of-bounds_asan Stack_out-of-bounds.c && ./Stack_out-of-bounds_asan

=================================================================
==56439==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fd10ee00034 at pc 0x564c302ee238 bp 0x7ffd9b304cf0 sp 0x7ffd9b304ce8
WRITE of size 4 at 0x7fd10ee00034 thread T0                                                                                                                  
    #0 0x564c302ee237 in main /home/kali/Desktop/fuzz/TEST/Stack_out-of-bounds.c:5
    #1 0x7fd110e456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd110e45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x564c302ee0a0 in _start (/home/kali/Desktop/fuzz/TEST/Stack_out-of-bounds_asan+0x10a0) (BuildId: b17be9b558bf49ca74c034fd889cccc9d6b9ab5f)

Address 0x7fd10ee00034 is located in stack of thread T0 at offset 52 in frame
    #0 0x564c302ee178 in main /home/kali/Desktop/fuzz/TEST/Stack_out-of-bounds.c:3

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/kali/Desktop/fuzz/TEST/Stack_out-of-bounds.c:5 in main
Shadow bytes around the buggy address:
  0x7fd10edffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10edffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10edffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10edfff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10edfff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7fd10ee00000: f1 f1 f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00 00 00
  0x7fd10ee00080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10ee00100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10ee00180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10ee00200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fd10ee00280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==56439==ABORTING
```

### Global out-of-bounds
#### Source code
```C
#include <stdio.h>

int global[5];

int main() {
    global[5] = 10; // Accessing out-of-bounds array index
    return 0;
}

//gcc -Og -g -o Global_out-of-bounds Global_out-of-bounds.c
```
#### Valgrind Report
```bash
# valgrind ./Global_out-of-bounds

==25986== Memcheck, a memory error detector
==25986== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==25986== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==25986== Command: ./Global_out-of-bounds
==25986== 
==25986== 
==25986== HEAP SUMMARY:
==25986==     in use at exit: 0 bytes in 0 blocks
==25986==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==25986== 
==25986== All heap blocks were freed -- no leaks are possible
==25986== 
==25986== For lists of detected and suppressed errors, rerun with: -s
==25986== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```bash
# gcc -fsanitize=address -Og -g -o Global_out-of-bounds_asan Global_out-of-bounds.c && ./Global_out-of-bounds_asan

=================================================================
==57029==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55a6068510f4 at pc 0x55a60684e1b8 bp 0x7ffe5baa4d80 sp 0x7ffe5baa4d78
WRITE of size 4 at 0x55a6068510f4 thread T0                                                                                                                  
    #0 0x55a60684e1b7 in main /home/kali/Desktop/fuzz/TEST/Global_out-of-bounds.c:6
    #1 0x7f895d4c56c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f895d4c5784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55a60684e0b0 in _start (/home/kali/Desktop/fuzz/TEST/Global_out-of-bounds_asan+0x10b0) (BuildId: c88352af7d4f9fa551fd869f59edfc81a99ac366)

0x55a6068510f4 is located 0 bytes after global variable 'global' defined in 'Global_out-of-bounds.c:3:5' (0x55a6068510e0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/kali/Desktop/fuzz/TEST/Global_out-of-bounds.c:6 in main                                              
Shadow bytes around the buggy address:
  0x55a606850e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606850e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606850f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606850f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606851000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x55a606851080: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00[04]f9
  0x55a606851100: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606851180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606851200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606851280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55a606851300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==57029==ABORTING
```

### Use-after-free
#### Source code
```C
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));
    free(ptr);
    *ptr = 10; // Accessing memory after it has been freed
    return 0;
}

//gcc -Og -g -o Use-after-free Use-after-free.c
```
#### Valgrind Report
```bash
# valgrind ./Use-after-free

==26309== Memcheck, a memory error detector
==26309== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==26309== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==26309== Command: ./Use-after-free
==26309== 
==26309== Invalid write of size 4
==26309==    at 0x10915F: main (Use-after-free.c:6)
==26309==  Address 0x4a4d040 is 0 bytes inside a block of size 4 free'd
==26309==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==26309==    by 0x10915E: main (Use-after-free.c:5)
==26309==  Block was alloc'd at
==26309==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==26309==    by 0x109153: main (Use-after-free.c:4)
==26309== 
==26309== 
==26309== HEAP SUMMARY:
==26309==     in use at exit: 0 bytes in 0 blocks
==26309==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==26309== 
==26309== All heap blocks were freed -- no leaks are possible
==26309== 
==26309== For lists of detected and suppressed errors, rerun with: -s
==26309== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```bash
# gcc -fsanitize=address -Og -g -o Use-after-free_asan Use-after-free.c && ./Use-after-free_asan

=================================================================
==57231==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55beb77981c3 bp 0x7fff1a8e6cc0 sp 0x7fff1a8e6cb8
WRITE of size 4 at 0x602000000010 thread T0                                                                                                                  
    #0 0x55beb77981c2 in main /home/kali/Desktop/fuzz/TEST/Use-after-free.c:6
    #1 0x7fca250456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fca25045784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55beb77980b0 in _start (/home/kali/Desktop/fuzz/TEST/Use-after-free_asan+0x10b0) (BuildId: e3d334f6d31874efe332079e247e098add4e262e)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:                                                                                                                                     
    #0 0x7fca252d7288 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x55beb779818e in main /home/kali/Desktop/fuzz/TEST/Use-after-free.c:5

previously allocated by thread T0 here:
    #0 0x7fca252d85bf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x55beb7798183 in main /home/kali/Desktop/fuzz/TEST/Use-after-free.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /home/kali/Desktop/fuzz/TEST/Use-after-free.c:6 in main
Shadow bytes around the buggy address:
  0x601ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x602000000000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==57231==ABORTING
```

### Use-after-return
#### Source code
```C
#include <stdio.h>

int *foo() {
    int x = 10;
    return &x; // Returning pointer to a local variable
}

int main() {
    int *ptr = foo();
    *ptr = 20; // Accessing memory after the function has returned
    return 0;
}

//gcc -Og -g -o Use-after-return Use-after-return.c
```
#### Valgrind Report
```bash
# valgrind ./Use-after-return

Use-after-return.c: In function ‘foo’:
Use-after-return.c:5:12: warning: function returns address of local variable [-Wreturn-local-addr]
    5 |     return &x; // Returning pointer to a local variable
      |            ^~
==26463== Memcheck, a memory error detector
==26463== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==26463== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==26463== Command: ./Use-after-return
==26463== 
==26463== Invalid write of size 4
==26463==    at 0x109139: main (Use-after-return.c:10)
==26463==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==26463== 
==26463== 
==26463== Process terminating with default action of signal 11 (SIGSEGV)
==26463==  Access not within mapped region at address 0x0
==26463==    at 0x109139: main (Use-after-return.c:10)
==26463==  If you believe this happened as a result of a stack
==26463==  overflow in your program's main thread (unlikely but
==26463==  possible), you can try to increase the size of the
==26463==  main thread stack using the --main-stacksize= flag.
==26463==  The main thread stack size used in this run was 8388608.
==26463== 
==26463== HEAP SUMMARY:
==26463==     in use at exit: 0 bytes in 0 blocks
==26463==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==26463== 
==26463== All heap blocks were freed -- no leaks are possible
==26463== 
==26463== For lists of detected and suppressed errors, rerun with: -s
==26463== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
zsh: segmentation fault  valgrind ./Use-after-return
```
### ASan Report
```bash
# gcc -fsanitize=address -Og -g -o Use-after-return_asan Use-after-return.c && ./Use-after-return_asan


AddressSanitizer:DEADLYSIGNAL
=================================================================
==57805==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5603a85d418c bp 0x000000000001 sp 0x7ffc2b35a090 T0)
==57805==The signal is caused by a WRITE memory access.                                                                                                      
==57805==Hint: address points to the zero page.
    #0 0x5603a85d418c in main /home/kali/Desktop/fuzz/TEST/Use-after-return.c:10
    #1 0x7f18e66456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f18e6645784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5603a85d4090 in _start (/home/kali/Desktop/fuzz/TEST/Use-after-return_asan+0x1090) (BuildId: a1468ca7059cdbed07674f10bf1d344248083dbe)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/kali/Desktop/fuzz/TEST/Use-after-return.c:10 in main
==57805==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```C
// 寫一個 Out-od-bound Write剛好越過redzone，說明ASAN能否襖出來
// [redzone]  | int a[8] | [redzone] | int b[8] | [redzone]

int main(void)
{
  int a[8];
  int b[8];

  a[16] = 100;

  printf("a[16]: %d\n", a[16]);  //100
  printf("b[0]: %d\n", b[0]);    //100

  b[16] = 100;
  printf("b[16]: %d\n", b[16]);   //100


  return 0;
}

// gcc -Og -g -o ByPassRedzone ByPassRedzone.c
// gcc -fsanitize=address -Og -g -o ByPassRedzone_asan ByPassRedzone.c && ./ByPassRedzone_asan
```
### Why
否，因為這次的Out-of-bound都沒有更改到Redzone，以a[8]來說Redzone範圍為a[8]~a[15]，只要沒蓋到這段都不會被ASAN偵測出來
