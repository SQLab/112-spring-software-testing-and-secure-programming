# Answer

Name: 
ID: 

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
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int)); // Allocate memory

    *ptr = 42;
    *(ptr + 1) = 43; // Out-of-bounds access

    free(ptr);
    return 0;
}
```
#### Valgrind Report
```
==3201148== Memcheck, a memory error detector
==3201148== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3201148== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3201148== Command: ./heap-out-of-bound
==3201148== 
==3201148== Invalid write of size 4
==3201148==    at 0x109184: main (heap-out-of-bound.c:9)
==3201148==  Address 0x4a6c044 is 0 bytes after a block of size 4 alloc'd
==3201148==    at 0x4843828: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3201148==    by 0x10917A: main (heap-out-of-bound.c:5)
==3201148== 
==3201148== 
==3201148== HEAP SUMMARY:
==3201148==     in use at exit: 0 bytes in 0 blocks
==3201148==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==3201148== 
==3201148== All heap blocks were freed -- no leaks are possible
==3201148== 
==3201148== For lists of detected and suppressed errors, rerun with: -s
==3201148== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3201417==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000014 at pc 0x5654dbe2a246 bp 0x7ffd5a871610 sp 0x7ffd5a871600
WRITE of size 4 at 0x602000000014 thread T0
    #0 0x5654dbe2a245 in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/heap-out-of-bound.c:9
    #1 0x7f94ff823a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f94ff823b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5654dbe2a104 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab5/heap-out-of-bound-asan+0x1104) (BuildId: 0234968b241abbbe198f0b77d23136f62824facd)

0x602000000014 is located 0 bytes after 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x7f94ffcdefef in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5654dbe2a1da in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/heap-out-of-bound.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/nems/112-spring-software-testing-and-secure-programming/lab5/heap-out-of-bound.c:9 in main
Shadow bytes around the buggy address:
  0x601ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x602000000000: fa fa[04]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==3201417==ABORTING
```

### Stack out-of-bounds
#### Source code
```C
#include <stdio.h>

int main() {
    int arr[5]; 

    arr[6] = 5; // Stack Out-of-bounds

}
```
#### Valgrind Report
```
==3201907== Memcheck, a memory error detector
==3201907== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3201907== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3201907== Command: ./stack-out-of-bound
==3201907== 
*** stack smashing detected ***: terminated
==3201907== 
==3201907== Process terminating with default action of signal 6 (SIGABRT)
==3201907==    at 0x48F552B: __pthread_kill_implementation (pthread_kill.c:44)
==3201907==    by 0x48F552B: __pthread_kill_internal (pthread_kill.c:78)
==3201907==    by 0x48F552B: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==3201907==    by 0x48A03B5: raise (raise.c:26)
==3201907==    by 0x488687B: abort (abort.c:79)
==3201907==    by 0x48875A3: __libc_message.cold (libc_fatal.c:150)
==3201907==    by 0x499316A: __fortify_fail (fortify_fail.c:24)
==3201907==    by 0x4993145: __stack_chk_fail (stack_chk_fail.c:24)
==3201907==    by 0x109187: main (stack-out-of-bound.c:9)
==3201907== 
==3201907== HEAP SUMMARY:
==3201907==     in use at exit: 0 bytes in 0 blocks
==3201907==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3201907== 
==3201907== All heap blocks were freed -- no leaks are possible
==3201907== 
==3201907== For lists of detected and suppressed errors, rerun with: -s
==3201907== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
[1]    3201907 IOT instruction  valgrind ./stack-out-of-bound
```
### ASan Report
```
==3202318==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7f8b7bf00038 at pc 0x55c7e140e2bd bp 0x7ffe48039ca0 sp 0x7ffe48039c90
WRITE of size 4 at 0x7f8b7bf00038 thread T0
    #0 0x55c7e140e2bc in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/stack-out-of-bound.c:6
    #1 0x7f8b7de23a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f8b7de23b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55c7e140e104 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab5/stack-out-of-bound-asan+0x1104) (BuildId: 223457fd7a650683fb1f530a92aa66feda62943e)

Address 0x7f8b7bf00038 is located in stack of thread T0 at offset 56 in frame
    #0 0x55c7e140e1d8 in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/stack-out-of-bound.c:3

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 56 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/nems/112-spring-software-testing-and-secure-programming/lab5/stack-out-of-bound.c:6 in main
Shadow bytes around the buggy address:
  0x7f8b7beffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7beffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7beffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7befff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7befff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f8b7bf00000: f1 f1 f1 f1 00 00 04[f3]f3 f3 f3 f3 00 00 00 00
  0x7f8b7bf00080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7bf00100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7bf00180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7bf00200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8b7bf00280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3202318==ABORTING
```

### Global out-of-bounds
#### Source code
```C
#include <stdio.h>

int arr[5]; 
int main() {
    arr[6] = 5; // Global Out-of-bounds

}
```
#### Valgrind Report
```
==3203073== Memcheck, a memory error detector
==3203073== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3203073== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3203073== Command: ./global-out-of-bound
==3203073== 
==3203073== 
==3203073== HEAP SUMMARY:
==3203073==     in use at exit: 0 bytes in 0 blocks
==3203073==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3203073== 
==3203073== All heap blocks were freed -- no leaks are possible
==3203073== 
==3203073== For lists of detected and suppressed errors, rerun with: -s
==3203073== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3203270==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55d404ee10b8 at pc 0x55d404ede203 bp 0x7ffe83efdd20 sp 0x7ffe83efdd10
WRITE of size 4 at 0x55d404ee10b8 thread T0
    #0 0x55d404ede202 in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/global-out-of-bound.c:5
    #1 0x7f80cdc23a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f80cdc23b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55d404ede104 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab5/global-out-of-bound-asan+0x1104) (BuildId: 4cab09b8d69de8b76bc7eed7fb8566442a682eba)

0x55d404ee10b8 is located 4 bytes after global variable 'arr' defined in 'global-out-of-bound.c:3:5' (0x55d404ee10a0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/nems/112-spring-software-testing-and-secure-programming/lab5/global-out-of-bound.c:5 in main
Shadow bytes around the buggy address:
  0x55d404ee0e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee0e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee0f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee0f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x55d404ee1080: 00 00 00 00 00 00 04[f9]f9 f9 f9 f9 00 00 00 00
  0x55d404ee1100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3203270==ABORTING
```

### Use-after-free
#### Source code
```C
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int)); 

    *ptr = 42; 

    printf("Value: %d\n", *ptr); 

    free(ptr); // Free the allocated memory

    printf("Value: %d\n", *ptr); // Use after free 

    return 0;
}
```
#### Valgrind Report
```
==3203073== Memcheck, a memory error detector
==3203073== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3203073== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3203073== Command: ./global-out-of-bound
==3203073== 
==3203073== 
==3203073== HEAP SUMMARY:
==3203073==     in use at exit: 0 bytes in 0 blocks
==3203073==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3203073== 
==3203073== All heap blocks were freed -- no leaks are possible
==3203073== 
==3203073== For lists of detected and suppressed errors, rerun with: -s
==3203073== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
 nems@csc2023  ~/112-spring-software-testing-and-secure-programming/lab5   lab5 ±  
 ✘ nems@csc2023  ~/112-spring-software-testing-and-secure-programming/lab5   lab5 ±  gcc -fsanitize=address -Og -g -o global-out-of-bound-asan global-out-of-bound.c && ./global-out-of-bound-asan
=================================================================
==3203270==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55d404ee10b8 at pc 0x55d404ede203 bp 0x7ffe83efdd20 sp 0x7ffe83efdd10
WRITE of size 4 at 0x55d404ee10b8 thread T0
    #0 0x55d404ede202 in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/global-out-of-bound.c:5
    #1 0x7f80cdc23a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f80cdc23b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55d404ede104 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab5/global-out-of-bound-asan+0x1104) (BuildId: 4cab09b8d69de8b76bc7eed7fb8566442a682eba)

0x55d404ee10b8 is located 4 bytes after global variable 'arr' defined in 'global-out-of-bound.c:3:5' (0x55d404ee10a0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/nems/112-spring-software-testing-and-secure-programming/lab5/global-out-of-bound.c:5 in main
Shadow bytes around the buggy address:
  0x55d404ee0e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee0e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee0f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee0f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x55d404ee1080: 00 00 00 00 00 00 04[f9]f9 f9 f9 f9 00 00 00 00
  0x55d404ee1100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55d404ee1300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3203270==ABORTING
 ✘ nems@csc2023  ~/112-spring-software-testing-and-secure-programming/lab5   lab5 ±  gcc -Og -g -o use-after-free  use-after-free.c     
 nems@csc2023  ~/112-spring-software-testing-and-secure-programming/lab5   lab5 ±  valgrind ./use-after-free                              
==3203600== Memcheck, a memory error detector
==3203600== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3203600== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3203600== Command: ./use-after-free
==3203600== 
Value: 42
==3203600== Invalid read of size 4
==3203600==    at 0x1091CC: main (use-after-free.c:13)
==3203600==  Address 0x4a6c040 is 0 bytes inside a block of size 4 free'd
==3203600==    at 0x484620F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3203600==    by 0x1091CB: main (use-after-free.c:11)
==3203600==  Block was alloc'd at
==3203600==    at 0x4843828: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3203600==    by 0x10919C: main (use-after-free.c:5)
==3203600== 
Value: 42
==3203600== 
==3203600== HEAP SUMMARY:
==3203600==     in use at exit: 0 bytes in 0 blocks
==3203600==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==3203600== 
==3203600== All heap blocks were freed -- no leaks are possible
==3203600== 
==3203600== For lists of detected and suppressed errors, rerun with: -s
==3203600== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3203704==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x559f7a70c2ee bp 0x7ffcd1f6f5f0 sp 0x7ffcd1f6f5e0
READ of size 4 at 0x602000000010 thread T0
    #0 0x559f7a70c2ed in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-free.c:13
    #1 0x7f3c5a823a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f3c5a823b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x559f7a70c184 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-free-asan+0x1184) (BuildId: bc447c411521767ecbab63ce08cb007302b99818)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f3c5acddb30 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x559f7a70c29f in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-free.c:11

previously allocated by thread T0 here:
    #0 0x7f3c5acdefef in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x559f7a70c257 in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-free.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-free.c:13 in main
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
==3203704==ABORTING
```

### Use-after-return
#### Source code
```C
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
#### Valgrind Report
```
==3204052== Memcheck, a memory error detector
==3204052== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3204052== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3204052== Command: ./use-after-return
==3204052== 
==3204052== Invalid read of size 4
==3204052==    at 0x109165: main (use-after-return.c:10)
==3204052==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==3204052== 
==3204052== 
==3204052== Process terminating with default action of signal 11 (SIGSEGV)
==3204052==  Access not within mapped region at address 0x0
==3204052==    at 0x109165: main (use-after-return.c:10)
==3204052==  If you believe this happened as a result of a stack
==3204052==  overflow in your program's main thread (unlikely but
==3204052==  possible), you can try to increase the size of the
==3204052==  main thread stack using the --main-stacksize= flag.
==3204052==  The main thread stack size used in this run was 8388608.
==3204052== 
==3204052== HEAP SUMMARY:
==3204052==     in use at exit: 0 bytes in 0 blocks
==3204052==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3204052== 
==3204052== All heap blocks were freed -- no leaks are possible
==3204052== 
==3204052== For lists of detected and suppressed errors, rerun with: -s
==3204052== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
[1]    3204052 segmentation fault  valgrind ./use-after-return
```
### ASan Report
```
use-after-return.c: In function ‘getPointer’:
use-after-return.c:5:12: warning: function returns address of local variable [-Wreturn-local-addr]
    5 |     return &x; // Return the address of a local variable
      |            ^~
AddressSanitizer:DEADLYSIGNAL
=================================================================
==3204216==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5651d5307224 bp 0x000000000001 sp 0x7ffe683061a0 T0)
==3204216==The signal is caused by a READ memory access.
==3204216==Hint: address points to the zero page.
    #0 0x5651d5307224 in main /home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-return.c:10
    #1 0x7ff2c6023a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ff2c6023b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5651d5307124 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-return-asan+0x1124) (BuildId: ace05ceb82e62a5accaceb004efd7791f513d5c6)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/nems/112-spring-software-testing-and-secure-programming/lab5/use-after-return.c:10 in main
==3204216==ABORTING
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
ASan may not detect the error because the out-of-bounds `a` write overwrites an adjacent stack-allocated array `b`, bypassing redzone protection for stack allocations.