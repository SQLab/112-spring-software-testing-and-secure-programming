# Answer

Name: 曾淯 
ID: 512558013

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    √    |   √   |
| Stack out-of-bounds  |    √    |   √   |
| Global out-of-bounds |    X    |   √   |
| Use-after-free       |    √    |   √   |
| Use-after-return     |    √    |   √   |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *array = malloc(5 * sizeof(int)); // 分配一個有5個整數的陣列
    if (array == NULL) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }

    // 正常初始化陣列
    for (int i = 0; i < 5; i++) {
        array[i] = i;
    }

    // 越界寫入
    array[5] = 10;  // 這是一個錯誤: 我們只有 array[0] 到 array[4]

    // 越界讀取
    int value = array[5];  // 同樣的錯誤
    printf("Value at index 5: %d\n", value);

    free(array); // 釋放記憶體
    return 0;
}


```
#### Valgrind Report
```
==9875== Memcheck, a memory error detector
==9875== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==9875== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==9875== Command: ./test
==9875== 
==9875== Invalid write of size 4
==9875==    at 0x1091E4: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test)
==9875==  Address 0x4a4f054 is 0 bytes after a block of size 20 alloc'd
==9875==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==9875==    by 0x10917A: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test)
==9875== 
==9875== Invalid read of size 4
==9875==    at 0x1091EE: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test)
==9875==  Address 0x4a4f054 is 0 bytes after a block of size 20 alloc'd
==9875==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==9875==    by 0x10917A: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test)
==9875== 
Value at index 5: 10
==9875== 
==9875== HEAP SUMMARY:
==9875==     in use at exit: 0 bytes in 0 blocks
==9875==   total heap usage: 2 allocs, 2 frees, 1,044 bytes allocated
==9875== 
==9875== All heap blocks were freed -- no leaks are possible
==9875== 
==9875== For lists of detected and suppressed errors, rerun with: -s
==9875== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==11218==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x503000000054 at pc 0x55c39ac8b2af bp 0x7ffc7990f910 sp 0x7ffc7990f908
WRITE of size 4 at 0x503000000054 thread T0
    #0 0x55c39ac8b2ae in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:17
    #1 0x7f8c10e456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f8c10e45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55c39ac8b100 in _start (/home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf_asan+0x1100) (BuildId: 7b2555b32a71be67212e7869c9f1d344f9b3afc5)

0x503000000054 is located 0 bytes after 20-byte region [0x503000000040,0x503000000054)
allocated by thread T0 here:
    #0 0x7f8c110f3bd7 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x55c39ac8b1d3 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:17 in main
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

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int array[5] = {1, 2, 3, 4, 5};
    // 正常索引範圍是 0 到 4，這裡訪問 index 5 將會導致越界
    int out_of_bounds = array[5];  // 越界讀取

    printf("Out of bounds value: %d\n", out_of_bounds);

    // 寫入越界位置
    array[5] = 10;  // 越界寫入

    return 0;
}

```
#### Valgrind Report
```
==14280== Memcheck, a memory error detector
==14280== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==14280== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==14280== Command: ./test2
==14280== 
==14280== Conditional jump or move depends on uninitialised value(s)
==14280==    at 0x48C6528: __printf_buffer (vfprintf-process-arg.c:58)
==14280==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==14280==    by 0x48BCC4A: printf (printf.c:33)
==14280==    by 0x109182: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test2)
==14280== 
==14280== Use of uninitialised value of size 8
==14280==    at 0x48BBEFB: _itoa_word (_itoa.c:177)
==14280==    by 0x48C5671: __printf_buffer (vfprintf-process-arg.c:155)
==14280==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==14280==    by 0x48BCC4A: printf (printf.c:33)
==14280==    by 0x109182: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test2)
==14280== 
==14280== Conditional jump or move depends on uninitialised value(s)
==14280==    at 0x48BBF0C: _itoa_word (_itoa.c:177)
==14280==    by 0x48C5671: __printf_buffer (vfprintf-process-arg.c:155)
==14280==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==14280==    by 0x48BCC4A: printf (printf.c:33)
==14280==    by 0x109182: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test2)
==14280== 
==14280== Conditional jump or move depends on uninitialised value(s)
==14280==    at 0x48C56C3: __printf_buffer (vfprintf-process-arg.c:186)
==14280==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==14280==    by 0x48BCC4A: printf (printf.c:33)
==14280==    by 0x109182: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test2)
==14280== 
Out of bounds value: 0
==14280== 
==14280== HEAP SUMMARY:
==14280==     in use at exit: 0 bytes in 0 blocks
==14280==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==14280== 
==14280== All heap blocks were freed -- no leaks are possible
==14280== 
==14280== Use --track-origins=yes to see where uninitialised values come from
==14280== For lists of detected and suppressed errors, rerun with: -s
==14280== ERROR SUMMARY: 4 errors from 4 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==15090==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7f4541600034 at pc 0x55a2df5533a9 bp 0x7ffe4f14c240 sp 0x7ffe4f14c238
READ of size 4 at 0x7f4541600034 thread T0                                                                                                                  
    #0 0x55a2df5533a8 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:6
    #1 0x7f45436456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f4543645784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55a2df5530e0 in _start (/home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf_asan2+0x10e0) (BuildId: 8fd0ed96bdb617c6e88d32fa521422c23d4aea7a)

Address 0x7f4541600034 is located in stack of thread T0 at offset 52 in frame
    #0 0x55a2df5531b8 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:3

  This frame has 1 object(s):
    [32, 52) 'array' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:6 in main
Shadow bytes around the buggy address:
  0x7f45415ffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f45415ffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f45415ffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f45415fff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f45415fff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f4541600000: f1 f1 f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00 00 00
  0x7f4541600080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f4541600100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f4541600180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f4541600200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f4541600280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==15090==ABORTING

```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int global_array[5] = {0, 1, 2, 3, 4};

void access_global_array() {
    // 正常索引範圍是 0 到 4，這裡訪問 index 6 將會導致越界
    int out_of_bounds = global_array[6];  // 越界讀取
    printf("Out of bounds value: %d\n", out_of_bounds);

    // 寫入越界位置
    global_array[6] = 20;  // 越界寫入
}

int main() {
    access_global_array();
    return 0;
}

```
#### Valgrind Report
```
==15870== Memcheck, a memory error detector
==15870== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==15870== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==15870== Command: ./test3
==15870== 
Out of bounds value: 0
==15870== 
==15870== HEAP SUMMARY:
==15870==     in use at exit: 0 bytes in 0 blocks
==15870==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==15870== 
==15870== All heap blocks were freed -- no leaks are possible
==15870== 
==15870== For lists of detected and suppressed errors, rerun with: -s
==15870== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==16356==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55859a4f3078 at pc 0x55859a4f0202 bp 0x7ffc3dba1ed0 sp 0x7ffc3dba1ec8
READ of size 4 at 0x55859a4f3078 thread T0
    #0 0x55859a4f0201 in access_global_array /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:7
    #1 0x55859a4f0214 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:15
    #2 0x7f1582a456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f1582a45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x55859a4f00d0 in _start (/home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf_asan3+0x10d0) (BuildId: 99b5102763f41fc4491f5db2ffcda7607f22f01f)

0x55859a4f3078 is located 4 bytes after global variable 'global_array' defined in 'uaf.c:3:5' (0x55859a4f3060) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:7 in access_global_array
Shadow bytes around the buggy address:
  0x55859a4f2d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55859a4f2e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55859a4f2e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55859a4f2f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55859a4f2f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x55859a4f3000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 04[f9]
  0x55859a4f3080: f9 f9 f9 f9 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x55859a4f3100: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x55859a4f3180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55859a4f3200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x55859a4f3280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==16356==ABORTING

```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int* ptr = malloc(sizeof(int));  // 動態分配記憶體
    *ptr = 10; 
    printf("Value: %d\n", *ptr);  // 正常使用

    free(ptr);  // 釋放記憶體

    // 釋放後繼續使用 ptr
    printf("After free value: %d\n", *ptr);  // 使用釋放後的記憶體

    *ptr = 20;  // 嘗試改變已釋放的記憶體

    return 0;
}

```
#### Valgrind Report
```
==17128== Memcheck, a memory error detector
==17128== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==17128== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==17128== Command: ./test4
==17128== 
Value: 10
==17128== Invalid read of size 4
==17128==    at 0x1091A5: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test4)
==17128==  Address 0x4a4f040 is 0 bytes inside a block of size 4 free'd
==17128==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17128==    by 0x1091A0: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test4)
==17128==  Block was alloc'd at
==17128==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17128==    by 0x10916A: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test4)
==17128== 
After free value: 10
==17128== Invalid write of size 4
==17128==    at 0x1091C1: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test4)
==17128==  Address 0x4a4f040 is 0 bytes inside a block of size 4 free'd
==17128==    at 0x48431EF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17128==    by 0x1091A0: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test4)
==17128==  Block was alloc'd at
==17128==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17128==    by 0x10916A: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test4)
==17128== 
==17128== 
==17128== HEAP SUMMARY:
==17128==     in use at exit: 0 bytes in 0 blocks
==17128==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==17128== 
==17128== All heap blocks were freed -- no leaks are possible
==17128== 
==17128== For lists of detected and suppressed errors, rerun with: -s
==17128== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==17333==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x560eff840279 bp 0x7ffc5df97440 sp 0x7ffc5df97438
READ of size 4 at 0x502000000010 thread T0                                                                                                                  
    #0 0x560eff840278 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:12
    #1 0x7f034ae456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f034ae45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x560eff8400f0 in _start (/home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf_asan4+0x10f0) (BuildId: 80015720d1a1a024ced1dc00e001784b2937222e)

0x502000000010 is located 0 bytes inside of 4-byte region [0x502000000010,0x502000000014)
freed by thread T0 here:                                                                                                                                    
    #0 0x7f034b0f2878 in free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x560eff84020a in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:9

previously allocated by thread T0 here:
    #0 0x7f034b0f3bd7 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x560eff8401c3 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:12 in main
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
==17333==ABORTING

```

### Use-after-return
#### Source code
```
#include <stdio.h>

int* dangling_pointer() {
    int local = 10;
    return &local;  // 返回局部變量的地址
}

int main() {
    int* ptr = dangling_pointer();  // 接收返回的堆疊記憶體地址
    printf("Dangling pointer value: %d\n", *ptr);  // 使用返回後的記憶體
    return 0;
}

```
#### Valgrind Report
```
==22581== Memcheck, a memory error detector
==22581== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==22581== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==22581== Command: ./test5
==22581== 
==22581== Conditional jump or move depends on uninitialised value(s)
==22581==    at 0x48C6528: __printf_buffer (vfprintf-process-arg.c:58)
==22581==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==22581==    by 0x48BCC4A: printf (printf.c:33)
==22581==    by 0x10917E: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test5)
==22581== 
==22581== Use of uninitialised value of size 8
==22581==    at 0x48BBEFB: _itoa_word (_itoa.c:177)
==22581==    by 0x48C5671: __printf_buffer (vfprintf-process-arg.c:155)
==22581==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==22581==    by 0x48BCC4A: printf (printf.c:33)
==22581==    by 0x10917E: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test5)
==22581== 
==22581== Conditional jump or move depends on uninitialised value(s)
==22581==    at 0x48BBF0C: _itoa_word (_itoa.c:177)
==22581==    by 0x48C5671: __printf_buffer (vfprintf-process-arg.c:155)
==22581==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==22581==    by 0x48BCC4A: printf (printf.c:33)
==22581==    by 0x10917E: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test5)
==22581== 
==22581== Conditional jump or move depends on uninitialised value(s)
==22581==    at 0x48C56C3: __printf_buffer (vfprintf-process-arg.c:186)
==22581==    by 0x48C6E00: __vfprintf_internal (vfprintf-internal.c:1459)
==22581==    by 0x48BCC4A: printf (printf.c:33)
==22581==    by 0x10917E: main (in /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/test5)
==22581== 
Value of invalid pointer: 42
==22581== 
==22581== HEAP SUMMARY:
==22581==     in use at exit: 0 bytes in 0 blocks
==22581==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==22581== 
==22581== All heap blocks were freed -- no leaks are possible
==22581== 
==22581== Use --track-origins=yes to see where uninitialised values come from
==22581== For lists of detected and suppressed errors, rerun with: -s
==22581== ERROR SUMMARY: 6 errors from 4 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==23091==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f8563c00020 at pc 0x5607ff03b2d9 bp 0x7ffff696b480 sp 0x7ffff696b478
READ of size 4 at 0x7f8563c00020 thread T0                                                                                                                  
    #0 0x5607ff03b2d8 in main /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:12
    #1 0x7f8565c456c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f8565c45784 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5607ff03b0e0 in _start (/home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf_asan5+0x10e0) (BuildId: 2f0eba6149fc844899287d524db8e1f468fb480f)

Address 0x7f8563c00020 is located in stack of thread T0 at offset 32 in frame
    #0 0x5607ff03b1b8 in setInvalidPointer /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:5

  This frame has 1 object(s):
    [32, 36) 'localVariable' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/kali/Desktop/112-spring-software-testing-and-secure-programming/lab5/uaf.c:12 in main
Shadow bytes around the buggy address:
  0x7f8563bffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563bffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563bffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563bfff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563bfff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f8563c00000: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x7f8563c00080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563c00100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563c00180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563c00200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f8563c00280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==23091==ABORTING

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[8];
    int b[8];

    // 將ptr指向a陣列的尾端
    int *ptr = (int *)((char *)a + sizeof(int) * 8);

    // ptr現在指向的位置恰好是陣列b的起始位置
    *ptr = 10; // 越界寫入，繞過redzone

    // 驗證b[0]是否被改變
    printf("b[0] = %d\n", b[0]);

    return 0;
}


```
### Why
繞過 ASan 的檢測，主要是因為發生在兩個連續內存塊之間，且這種連續性導致沒有 red zones 被插入
