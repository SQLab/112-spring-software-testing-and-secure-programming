# Answer

Name: 
ID: 

## Test Valgrind and ASan
### Result
|                      | Valgrind |  Asan |
| -------------------- | -------- | ----- |
| Heap out-of-bounds   |    V     |   V   |
| Stack out-of-bounds  |    X     |   V   |
| Global out-of-bounds |    X     |   V   |
| Use-after-free       |    X     |   V   |
| Use-after-return     |    X     |   V   |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = malloc(sizeof(int) * 5);
    int *fake_arr = (int *)((char *)arr + sizeof(int) * 5); // Pointing to memory after arr
    *fake_arr = 10; // Writing out-of-bounds
    free(arr);
    printf("Writing out-of-bounds at address: %p\n", (void *)fake_arr);
    return 0;
}

```
#### Valgrind Report
```
==3501129== Memcheck, a memory error detector
==3501129== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3501129== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==3501129== Command: ./test_heap
==3501129== 
==3501129== Invalid write of size 4
==3501129==    at 0x10917F: main (in /home/black/Desktop/lab5/test_heap)
==3501129==  Address 0x4a57054 is 0 bytes after a block of size 20 alloc'd
==3501129==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3501129==    by 0x10916A: main (in /home/black/Desktop/lab5/test_heap)
==3501129== 
Writing out-of-bounds at address: 0x4a57054
==3501129== 
==3501129== HEAP SUMMARY:
==3501129==     in use at exit: 0 bytes in 0 blocks
==3501129==   total heap usage: 2 allocs, 2 frees, 1,044 bytes allocated
==3501129== 
==3501129== All heap blocks were freed -- no leaks are possible
==3501129== 
==3501129== For lists of detected and suppressed errors, rerun with: -s
==3501129== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)


```
### ASan Report
```
==3503266==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x503000000054 at pc 0x559503e04209 bp 0x7ffd7a5fe070 sp 0x7ffd7a5fe068
WRITE of size 4 at 0x503000000054 thread T0                                                                                                      
    #0 0x559503e04208 in main /home/black/Desktop/lab5/test_heap.c:7
    #1 0x7fec1bc456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fec1bc45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x559503e040e0 in _start (/home/black/Desktop/lab5/ascan_heap+0x10e0) (BuildId: a133167d5af7b5273c020b7c642137f3101e3d47)

0x503000000054 is located 0 bytes after 20-byte region [0x503000000040,0x503000000054)
allocated by thread T0 here:                                                                                                                     
    #0 0x7fec1bef3bd7 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x559503e041b3 in main /home/black/Desktop/lab5/test_heap.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/black/Desktop/lab5/test_heap.c:7 in main
Shadow bytes around the buggy address:
  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x503000000000: fa fa 00 00 00 fa fa fa 00 00[04]fa fa fa fa fa
  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==3503266==ABORTING

```
Valgrind 能, ASan 能

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
int main()
{
    int arr[] = {1,2,3};
    printf("arr[10] is %d\n", arr[3]);

    return 0;
}

```
#### Valgrind Report
```
==3505931== Memcheck, a memory error detector
==3505931== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3505931== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==3505931== Command: ./test_stack
==3505931== 
arr[10] is 1
==3505931== 
==3505931== HEAP SUMMARY:
==3505931==     in use at exit: 0 bytes in 0 blocks
==3505931==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==3505931== 
==3505931== All heap blocks were freed -- no leaks are possible
==3505931== 
==3505931== For lists of detected and suppressed errors, rerun with: -s
==3505931== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=3506371==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7f73af10002c at pc 0x55735c53f2fe bp 0x7ffc3130a770 sp 0x7ffc3130a768
READ of size 4 at 0x7f73af10002c thread T0
    #0 0x55735c53f2fd in main /home/black/Desktop/lab5/test_stack.c:5
    #1 0x7f73b19096c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f73b1909784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55735c53f0e0 in _start (/home/black/Desktop/lab5/ascan_stack+0x10e0) (BuildId: 902f2b33d08e660c8b7ff0378a9babac2cb7fb82)

Address 0x7f73af10002c is located in stack of thread T0 at offset 44 in frame
    #0 0x55735c53f1b8 in main /home/black/Desktop/lab5/test_stack.c:3

  This frame has 1 object(s):
    [32, 44) 'arr' (line 4) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/black/Desktop/lab5/test_stack.c:5 in main
Shadow bytes around the buggy address:
  0x7f73af0ffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af0ffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af0ffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af0fff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af0fff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f73af100000: f1 f1 f1 f1 00[04]f3 f3 00 00 00 00 00 00 00 00
  0x7f73af100080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af100100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af100180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af100200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f73af100280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3506371==ABORTING

```
Valgrind 不能, ASan 能

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int global_array[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

int main()
{
    int *global_array_ptr = (int *)(&global_array + 1); // Pointing to memory after global_array
    *global_array_ptr = 10; // Writing out-of-bounds
    return 0;
}

}
```
#### Valgrind Report
```
==3512949== Memcheck, a memory error detector
==3512949== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3512949== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==3512949== Command: ./test_global
==3512949== 
==3512949== 
==3512949== HEAP SUMMARY:
==3512949==     in use at exit: 0 bytes in 0 blocks
==3512949==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3512949== 
==3512949== All heap blocks were freed -- no leaks are possible
==3512949== 
==3512949== For lists of detected and suppressed errors, rerun with: -s
==3512949== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)


```
### ASan Report
```
==3513235==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55e66b86f088 at pc 0x55e66b86c1af bp 0x7ffca1e21670 sp 0x7ffca1e21668
WRITE of size 4 at 0x55e66b86f088 thread T0                                                                                                      
    #0 0x55e66b86c1ae in main /home/black/Desktop/lab5/test_global.c:8
    #1 0x7fb3d00456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb3d0045784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55e66b86c0b0 in _start (/home/black/Desktop/lab5/ascan_global+0x10b0) (BuildId: a91299a30dcffa79fd8f90f4f737e5e3e0a16fa0)

0x55e66b86f088 is located 0 bytes after global variable 'global_array' defined in 'test_global.c:3:5' (0x55e66b86f060) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/black/Desktop/lab5/test_global.c:8 in main                                               
Shadow bytes around the buggy address:
  0x55e66b86ee00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86ee80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86ef00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86ef80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86f000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x55e66b86f080: 00[f9]f9 f9 f9 f9 f9 f9 00 00 00 00 f9 f9 f9 f9
  0x55e66b86f100: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86f180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86f200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86f280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55e66b86f300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3513235==ABORTING


```
Valgrind 不能, ASan 能


### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *intArr = malloc(2 * sizeof(int) );
    intArr[0] = 100;
    intArr[1] = 200;
    free(intArr);
    printf("%d\n",intArr[0]);

    return 0;
}
```
#### Valgrind Report
```
=3517932== Memcheck, a memory error detector
==3517932== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3517932== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==3517932== Command: ./test_use_agter_free
==3517932== 
==3517932== Invalid read of size 4
==3517932==    at 0x109197: main (in /home/black/Desktop/lab5/test_use_agter_free)
==3517932==  Address 0x4a57040 is 0 bytes inside a block of size 8 free'd
==3517932==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3517932==    by 0x109192: main (in /home/black/Desktop/lab5/test_use_agter_free)
==3517932==  Block was alloc'd at
==3517932==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3517932==    by 0x10916A: main (in /home/black/Desktop/lab5/test_use_agter_free)
==3517932== 
100
==3517932== 
==3517932== HEAP SUMMARY:
==3517932==     in use at exit: 0 bytes in 0 blocks
==3517932==   total heap usage: 2 allocs, 2 frees, 1,032 bytes allocated
==3517932== 
==3517932== All heap blocks were freed -- no leaks are possible
==3517932== 
==3517932== For lists of detected and suppressed errors, rerun with: -s
==3517932== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3518639==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x561c1b6c2269 bp 0x7ffd670537f0 sp 0x7ffd670537e8
READ of size 4 at 0x502000000010 thread T0                                                                                                       
    #0 0x561c1b6c2268 in main /home/black/Desktop/lab5/test_use_after_free.c:9
    #1 0x7f4f324456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f4f32445784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x561c1b6c20f0 in _start (/home/black/Desktop/lab5/asan_use_after_free+0x10f0) (BuildId: 9994ced90dccfbb90464229bc0373bdaac622504)

0x502000000010 is located 0 bytes inside of 8-byte region [0x502000000010,0x502000000018)
freed by thread T0 here:                                                                                                                         
    #0 0x7f4f326f2878 in free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x561c1b6c221a in main /home/black/Desktop/lab5/test_use_after_free.c:8

previously allocated by thread T0 here:
    #0 0x7f4f326f3bd7 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x561c1b6c21c3 in main /home/black/Desktop/lab5/test_use_after_free.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/black/Desktop/lab5/test_use_after_free.c:9 in main
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==3518639==ABORTING
```
Valgrind 能, ASan 能

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int *returnPointer() {
    int *ptr = malloc(sizeof(int));
    *ptr = 42;
    return ptr;
}

int main() {
    int *ptr = returnPointer();
    free(ptr);
    printf("%d\n", *ptr);
    return 0;
}
```
#### Valgrind Report
```
==3524478== Memcheck, a memory error detector
==3524478== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3524478== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==3524478== Command: ./test_use_after_return
==3524478== 
==3524478== Invalid read of size 4
==3524478==    at 0x1091A5: main (in /home/black/Desktop/lab5/test_use_after_return)
==3524478==  Address 0x4a57040 is 0 bytes inside a block of size 4 free'd
==3524478==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3524478==    by 0x1091A0: main (in /home/black/Desktop/lab5/test_use_after_return)
==3524478==  Block was alloc'd at
==3524478==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3524478==    by 0x10916A: returnPointer (in /home/black/Desktop/lab5/test_use_after_return)
==3524478==    by 0x109190: main (in /home/black/Desktop/lab5/test_use_after_return)
==3524478== 
42
==3524478== 
==3524478== HEAP SUMMARY:
==3524478==     in use at exit: 0 bytes in 0 blocks
==3524478==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==3524478== 
==3524478== All heap blocks were freed -- no leaks are possible
==3524478== 
==3524478== For lists of detected and suppressed errors, rerun with: -s
==3524478== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==3525380==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x56363a5dd250 bp 0x7ffc6b019060 sp 0x7ffc6b019058
READ of size 4 at 0x502000000010 thread T0                                                                                                       
    #0 0x56363a5dd24f in main /home/black/Desktop/lab5/test_use_after_return.c:13
    #1 0x7f5fd0c456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f5fd0c45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x56363a5dd0f0 in _start (/home/black/Desktop/lab5/asan_use_after_return+0x10f0) (BuildId: 0819857d45895ebfd294ec91c464476a4a6691a4)

0x502000000010 is located 0 bytes inside of 4-byte region [0x502000000010,0x502000000014)
freed by thread T0 here:                                                                                                                         
    #0 0x7f5fd0ef2878 in free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x56363a5dd20e in main /home/black/Desktop/lab5/test_use_after_return.c:12

previously allocated by thread T0 here:
    #0 0x7f5fd0ef3bd7 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x56363a5dd1c6 in returnPointer /home/black/Desktop/lab5/test_use_after_return.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/black/Desktop/lab5/test_use_after_return.c:13 in main
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==3525380==ABORTING
```
Valgrind 能, ASan 能

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int array[10] = {0}; // 宣告一個包含10個整數的陣列

    // 計算第11個整數的地址，即超出陣列邊界的地址
    int *ptr = &array[10];

    // 寫入數值到超出陣列邊界的地址
    *ptr = 42;

    // 打印超出邊界後的陣列內容
    for (int i = 0; i < 11; ++i) {
        printf("%d ", array[i]);
    }
    printf("\n");

    return 0;
}
```
### Why
原因是寫入操作發生在陣列的邊界之外，超出了 ASan 所設置的紅區 (redzone) 範圍之外，因此 ASan 無法檢測到這樣的錯誤。
