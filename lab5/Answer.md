# Answer

Name: 陳冠霖
ID: 511558015

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    v     |  v   |
| Stack out-of-bounds  |    v     |  x   |
| Global out-of-bounds |    v     |  x   |
| Use-after-free       |    v     |  v   |
| Use-after-return     |    v     |  v   |

version
valgrind-3.18.1
gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int* array = (int*) malloc(10 * sizeof(int)); // Allocate an array of 10 integers on the heap
    for (int i = 0; i <= 10; i++) { // Incorrect loop boundary; should be i < 10
        array[i] = i; // Out-of-bounds write on the last iteration
    }
    printf("Element at index 10: %d\n", array[10]); // Out-of-bounds read
    free(array);
    return 0;
}

```
#### Valgrind Report
```
==33566== Memcheck, a memory error detector
==33566== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==33566== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==33566== Command: ./Heap-Out-of-Bounds
==33566== 
==33566== Invalid write of size 4
==33566==    at 0x1091C3: main (in /home/guan/Desktop/LAB5/Valgrind/Heap-Out-of-Bounds)
==33566==  Address 0x4a96068 is 0 bytes after a block of size 40 alloc'd
==33566==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==33566==    by 0x10919E: main (in /home/guan/Desktop/LAB5/Valgrind/Heap-Out-of-Bounds)
==33566== 
==33566== Invalid read of size 4
==33566==    at 0x1091D7: main (in /home/guan/Desktop/LAB5/Valgrind/Heap-Out-of-Bounds)
==33566==  Address 0x4a96068 is 0 bytes after a block of size 40 alloc'd
==33566==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==33566==    by 0x10919E: main (in /home/guan/Desktop/LAB5/Valgrind/Heap-Out-of-Bounds)
==33566== 
Element at index 10: 10
==33566== 
==33566== HEAP SUMMARY:
==33566==     in use at exit: 0 bytes in 0 blocks
==33566==   total heap usage: 2 allocs, 2 frees, 1,064 bytes allocated
==33566== 
==33566== All heap blocks were freed -- no leaks are possible
==33566== 
==33566== For lists of detected and suppressed errors, rerun with: -s
==33566== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==33568==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x59ae28fe0297 bp 0x7ffc365169a0 sp 0x7ffc36516990
WRITE of size 4 at 0x604000000038 thread T0
    #0 0x59ae28fe0296 in main /home/guan/Desktop/LAB4/Sanitizer/Heap-Out-of-Bounds.c:7
    #1 0x7d2866c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7d2866c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x59ae28fe0184 in _start (/home/guan/Desktop/LAB5/Sanitizer/Heap-Out-of-Bounds+0x1184)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7d28670b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x59ae28fe0257 in main /home/guan/Desktop/LAB4/Sanitizer/Heap-Out-of-Bounds.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/guan/Desktop/LAB4/Sanitizer/Heap-Out-of-Bounds.c:7 in main
Shadow bytes around the buggy address:
  0x0c087fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c087fff8000: fa fa 00 00 00 00 00[fa]fa fa fa fa fa fa fa fa
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
==33568==ABORTING
```
ASan 能 , valgrind 能
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
#### Valgrind Report
```
==33585== Memcheck, a memory error detector
==33585== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==33585== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==33585== Command: ./Stack-Out-of-Bounds
==33585== 
Element at index 10: 123
*** stack smashing detected ***: terminated
==33585== 
==33585== Process terminating with default action of signal 6 (SIGABRT)
==33585==    at 0x49009FC: __pthread_kill_implementation (pthread_kill.c:44)
==33585==    by 0x49009FC: __pthread_kill_internal (pthread_kill.c:78)
==33585==    by 0x49009FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==33585==    by 0x48AC475: raise (raise.c:26)
==33585==    by 0x48927F2: abort (abort.c:79)
==33585==    by 0x48F3675: __libc_message (libc_fatal.c:155)
==33585==    by 0x49A0599: __fortify_fail (fortify_fail.c:26)
==33585==    by 0x49A0565: __stack_chk_fail (stack_chk_fail.c:24)
==33585==    by 0x1091BC: main (in /home/guan/Desktop/LAB5/Valgrind/Stack-Out-of-Bounds)
==33585== 
==33585== HEAP SUMMARY:
==33585==     in use at exit: 1,024 bytes in 1 blocks
==33585==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==33585== 
==33585== LEAK SUMMARY:
==33585==    definitely lost: 0 bytes in 0 blocks
==33585==    indirectly lost: 0 bytes in 0 blocks
==33585==      possibly lost: 0 bytes in 0 blocks
==33585==    still reachable: 1,024 bytes in 1 blocks
==33585==         suppressed: 0 bytes in 0 blocks
==33585== Rerun with --leak-check=full to see details of leaked memory
==33585== 
==33585== For lists of detected and suppressed errors, rerun with: -s
==33585== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted (core dumped)

```
### ASan Report
```
=================================================================
==33644==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd60da6f38 at pc 0x57201453a34c bp 0x7ffd60da6ed0 sp 0x7ffd60da6ec0
WRITE of size 4 at 0x7ffd60da6f38 thread T0
    #0 0x57201453a34b in main /home/guan/Desktop/LAB4/Sanitizer/Stack-Out-of-Bounds.c:5
    #1 0x7b2cd1a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7b2cd1a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x57201453a164 in _start (/home/guan/Desktop/LAB5/Sanitizer/Stack-Out-of-Bounds+0x1164)

Address 0x7ffd60da6f38 is located in stack of thread T0 at offset 88 in frame
    #0 0x57201453a238 in main /home/guan/Desktop/LAB4/Sanitizer/Stack-Out-of-Bounds.c:3

  This frame has 1 object(s):
    [48, 88) 'array' (line 4) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/guan/Desktop/LAB4/Sanitizer/Stack-Out-of-Bounds.c:5 in main
Shadow bytes around the buggy address:
  0x10002c1acd90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1acda0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1acdb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1acdc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1acdd0: 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1
=>0x10002c1acde0: f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3 00 00 00 00
  0x10002c1acdf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1ace00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1ace10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1ace20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c1ace30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==33644==ABORTING
```
ASan 能 , valgrind 不能
### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int globalArray[10];

void writeGlobalArray() {
    globalArray[15] = 5; // Out-of-bounds write
}

int main() {
    writeGlobalArray();
    printf("Out of bounds value: %d\n", globalArray[15]); // Out-of-bounds read
    return 0;
}
```
#### Valgrind Report
```
==33724== Memcheck, a memory error detector
==33724== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==33724== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==33724== Command: ./Global-Out-of-Bounds
==33724== 
Out of bounds value: 5
==33724== 
==33724== HEAP SUMMARY:
==33724==     in use at exit: 0 bytes in 0 blocks
==33724==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==33724== 
==33724== All heap blocks were freed -- no leaks are possible
==33724== 
==33724== For lists of detected and suppressed errors, rerun with: -s
==33724== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==33727==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5fd31f23b11c at pc 0x5fd31f238247 bp 0x7fff2ae445b0 sp 0x7fff2ae445a0
WRITE of size 4 at 0x5fd31f23b11c thread T0
    #0 0x5fd31f238246 in writeGlobalArray /home/guan/Desktop/LAB4/Sanitizer/Global-Out-of-Bounds.c:6
    #1 0x5fd31f238258 in main /home/guan/Desktop/LAB4/Sanitizer/Global-Out-of-Bounds.c:10
    #2 0x717a7ac29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x717a7ac29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x5fd31f238144 in _start (/home/guan/Desktop/LAB5/Sanitizer/Global-Out-of-Bounds+0x1144)

0x5fd31f23b11c is located 20 bytes to the right of global variable 'globalArray' defined in 'Global-Out-of-Bounds.c:3:5' (0x5fd31f23b0e0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/guan/Desktop/LAB4/Sanitizer/Global-Out-of-Bounds.c:6 in writeGlobalArray
Shadow bytes around the buggy address:
  0x0bfae3e3f5d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bfae3e3f5e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bfae3e3f5f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bfae3e3f600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0bfae3e3f610: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0bfae3e3f620: 00 f9 f9[f9]f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0bfae3e3f630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bfae3e3f640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bfae3e3f650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bfae3e3f660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bfae3e3f670: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==33727==ABORTING
```
ASan 能 , valgrind 不能
### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int* ptr = (int*) malloc(sizeof(int));
    *ptr = 10;
    free(ptr); // Free the allocated memory
    printf("Use after free value: %d\n", *ptr); // Use after free
    return 0;
}
```
#### Valgrind Report
```
==35124== Memcheck, a memory error detector
==35124== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==35124== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==35124== Command: ./Use-After-Free
==35124== 
==35124== Invalid read of size 4
==35124==    at 0x1091BD: main (in /home/guan/Desktop/LAB5/Valgrind/Use-After-Free)
==35124==  Address 0x4a96040 is 0 bytes inside a block of size 4 free'd
==35124==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==35124==    by 0x1091B8: main (in /home/guan/Desktop/LAB5/Valgrind/Use-After-Free)
==35124==  Block was alloc'd at
==35124==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==35124==    by 0x10919E: main (in /home/guan/Desktop/LAB5/Valgrind/Use-After-Free)
==35124== 
Use after free value: 10
==35124== 
==35124== HEAP SUMMARY:
==35124==     in use at exit: 0 bytes in 0 blocks
==35124==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==35124== 
==35124== All heap blocks were freed -- no leaks are possible
==35124== 
==35124== For lists of detected and suppressed errors, rerun with: -s
==35124== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==4406==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x57f86e0252d3 bp 0x7fff9d010660 sp 0x7fff9d010650
READ of size 4 at 0x602000000010 thread T0
    #0 0x57f86e0252d2 in main /home/guan/Desktop/LAB4/Sanitizer/Use-After-Free.c:8
    #1 0x7a6ab1c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7a6ab1c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x57f86e025184 in _start (/home/guan/Desktop/LAB5/Sanitizer/Use-After-Free+0x1184)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7a6ab20b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x57f86e025284 in main /home/guan/Desktop/LAB4/Sanitizer/Use-After-Free.c:7

previously allocated by thread T0 here:
    #0 0x7a6ab20b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x57f86e025257 in main /home/guan/Desktop/LAB4/Sanitizer/Use-After-Free.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/guan/Desktop/LAB4/Sanitizer/Use-After-Free.c:8 in main
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
==4406==ABORTING
```
ASan 能 , valgrind 能
### Use-after-return
#### Source code
```
#include <stdio.h>

int* dangerousFunction() {
    int localValue = 123;
    return &localValue; // Returning address of local stack variable
}

int main() {
    int* ptr = dangerousFunction();
    printf("Use after return value: %d\n", *ptr); // Use after return
    return 0;
}
```
#### Valgrind Report
```
==4417== Memcheck, a memory error detector
==4417== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4417== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4417== Command: ./Use-After-Return
==4417== 
==4417== Invalid read of size 4
==4417==    at 0x1091C4: main (in /home/guan/Desktop/LAB5/Valgrind/Use-After-Return)
==4417==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==4417== 
==4417== 
==4417== Process terminating with default action of signal 11 (SIGSEGV)
==4417==  Access not within mapped region at address 0x0
==4417==    at 0x1091C4: main (in /home/guan/Desktop/LAB5/Valgrind/Use-After-Return)
==4417==  If you believe this happened as a result of a stack
==4417==  overflow in your program's main thread (unlikely but
==4417==  possible), you can try to increase the size of the
==4417==  main thread stack using the --main-stacksize= flag.
==4417==  The main thread stack size used in this run was 8388608.
==4417== 
==4417== HEAP SUMMARY:
==4417==     in use at exit: 0 bytes in 0 blocks
==4417==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==4417== 
==4417== All heap blocks were freed -- no leaks are possible
==4417== 
==4417== For lists of detected and suppressed errors, rerun with: -s
==4417== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==4483==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x57428fb6a224 bp 0x000000000001 sp 0x7ffcf2eaf3b0 T0)
==4483==The signal is caused by a READ memory access.
==4483==Hint: address points to the zero page.
    #0 0x57428fb6a224 in main /home/guan/Desktop/LAB4/Sanitizer/Use-After-Return.c:10
    #1 0x768a56c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x768a56c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x57428fb6a124 in _start (/home/guan/Desktop/LAB5/Sanitizer/Use-After-Return+0x1124)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/guan/Desktop/LAB4/Sanitizer/Use-After-Return.c:10 in main
==4483==ABORTING
```
ASan 能 , valgrind 能
## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdlib.h>

int main() {
  int a[8], b[8];
  b[8] = 42; 
  return 0;
}

```
### Why
=================================================================
==6800==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe225ea900 at pc 0x5abf85f2c2b2 bp 0x7ffe225ea8b0 sp 0x7ffe225ea8a0
WRITE of size 4 at 0x7ffe225ea900 thread T0
    #0 0x5abf85f2c2b1 in main /home/guan/Desktop/LAB5/Requirement/Requirement.c:7
    #1 0x77deb7a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x77deb7a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5abf85f2c104 in _start (/home/guan/Desktop/LAB5/Requirement/Requirement+0x1104)

Address 0x7ffe225ea900 is located in stack of thread T0 at offset 64 in frame
    #0 0x5abf85f2c1d8 in main /home/guan/Desktop/LAB5/Requirement/Requirement.c:3

  This frame has 1 object(s):
    [32, 64) 'b' (line 5) <== Memory access at offset 64 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/guan/Desktop/LAB5/Requirement/Requirement.c:7 in main
Shadow bytes around the buggy address:
  0x1000444b54d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b54e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b54f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b5500: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b5510: 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00 00 00
=>0x1000444b5520:[f3]f3 f3 f3 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b5530: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b5540: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b5550: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b5560: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000444b5570: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==6800==ABORTING

雖然沒有直接寫入redzone，執行ASan後仍可以發現這個錯誤
ASan可以接控記憶體區域，所以在寫入時會提示錯誤