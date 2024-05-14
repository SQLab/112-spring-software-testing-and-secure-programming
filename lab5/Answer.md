# Answer

Name: 蘇宥穆
ID: 512559029

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |Yes       |Yes   |
| Stack out-of-bounds  |Yes       |Yes   |
| Global out-of-bounds |Yes       |Yes   |
| Use-after-free       |Yes       |Yes   |
| Use-after-return     |Yes       |Yes   |

### Heap out-of-bounds
#### Source code

#include <stdlib.h>

int main() {
    int *ptr = malloc(3 * sizeof(int));
    ptr[3] = 10;  // Heap out-of-bounds write

    int value = ptr[4];  // Heap out-of-bounds read

    free(ptr);
    return 0;
}

#### Valgrind Report

==3567== Invalid write of size 4
==3567==    at 0x1091AB: main (example.c:6)
==3567==  Address 0x4a52010 is 0 bytes after a block of size 12 alloc'd
==3567==    at 0x483DFAF: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==3567==    by 0x109194: main (example.c:4)
==3567==
==3567== Invalid read of size 4
==3567==    at 0x1091B9: main (example.c:8)
==3567==  Address 0x4a52010 is 0 bytes after a block of size 12 alloc'd
==3567==    at 0x483DFAF: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==3567==    by 0x109194: main (example.c:4)
==3567==

### ASan Report

=================================================================
==3799==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000024 at pc 0x000000401133 bp 0x7ffcd6a2c8d0 sp 0x7ffcd6a2c8c0
WRITE of size 4 at 0x602000000024 thread T0
    #0 0x401132 in main (/path/to/your/program+0x401132)
    #1 0x7f63dbde6b24 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x21b24)
    #2 0x40105d in _start (/path/to/your/program+0x40105d)

0x602000000024 is located 0 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7f63dbf7abba in malloc (/usr/lib/x86_64-linux-gnu/libasan.so.4+0xdebba)
    #1 0x4010ad in main (/path/to/your/program+0x4010ad)

SUMMARY: AddressSanitizer: heap-buffer-overflow (/path/to/your/program+0x401132) in main

### Stack out-of-bounds
#### Source code

#include <stdio.h>

int main() {
    int array[3];
    array[3] = 10;  // Stack out-of-bounds write

    int value = array[4];  // Stack out-of-bounds read

    printf("%d\n", value);  // Avoid optimization
    return 0;
}

#### Valgrind Report

==4286== Invalid write of size 4
==4286==    at 0x1091AB: main (example.c:5)
==4286==  Address 0x7ffdb8060e1c is on the stack
==4286==  in frame #0, created by main (example.c:3)
==4286==
==4286== Invalid read of size 4
==4286==    at 0x1091C1: main (example.c:7)
==4286==  Address 0x7ffdb8060e20 is on the stack
==4286==  in frame #0, created by main (example.c:3)
==4286==

### ASan Report

=================================================================
==4577==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffca1873e3c at pc 0x00000040112b bp 0x7ffca1873e00 sp 0x7ffca1873df0
WRITE of size 4 at 0x7ffca1873e3c thread T0
    #0 0x40112a in main (/path/to/your/program+0x40112a)
    #1 0x7f34e69f5b24 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x21b24)
    #2 0x40105d in _start (/path/to/your/program+0x40105d)

Address 0x7ffca1873e3c is located in stack of thread T0 at offset 28 in frame
    #0 0x4010eb in main (/path/to/your/program+0x4010eb)

  This frame has 1 object(s):
    [32, 36) 'array' (line 3) <== Memory access at offset 28 overflows this variable

### Global out-of-bounds
#### Source code

#include <stdio.h>

int global_array[3];

int main() {
    global_array[3] = 10;  // Global out-of-bounds write

    int value = global_array[4];  // Global out-of-bounds read

    printf("%d\n", value);  // Avoid optimization
    return 0;
}

#### Valgrind Report

==5007== Invalid write of size 4
==5007==    at 0x1091AB: main (example.c:5)
==5007==  Address 0x1091b4 is 0 bytes after a block of size 12 alloc'd
==5007==    at 0x483DFAF: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==5007==    by 0x109194: main (example.c:4)
==5007==
==5007== Invalid read of size 4
==5007==    at 0x1091C1: main (example.c:7)
==5007==  Address 0x1091b4 is 0 bytes after a block of size 12 alloc'd
==5007==    at 0x483DFAF: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==5007==    by 0x109194: main (example.c:4)

### ASan Report

=================================================================
==5334==ERROR: AddressSanitizer: global-buffer-overflow on address 0x0000004005f4 at pc 0x000000401132 bp 0x7fffd3bcb880 sp 0x7fffd3bcb878
READ of size 4 at 0x0000004005f4 thread T0
    #0 0x401131 in main (/path/to/your/program+0x401131)
    #1 0x7f46d12e3b24 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x21b24)
    #2 0x40105d in _start (/path/to/your/program+0x40105d)

Address 0x0000004005f4 is located 0 bytes to the right of global variable 'global_array' defined in 'example.c:3:5' (0x4005a0) of size 12

### Use-after-free
#### Source code

#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    free(ptr);
    *ptr = 10;  // Use-after-free

    return 0;
}

#### Valgrind Report

==5724== Invalid write of size 4
==5724==    at 0x1091AB: main (example.c:5)
==5724==  Address 0x4a52010 is 0 bytes inside a block of size 4 free'd
==5724==    at 0x483DF9F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==5724==    by 0x10919A: main (example.c:4)
==5724==  Block was alloc'd at
==5724==    at 0x483DFAF: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==5724==    by 0x109194: main (example.c:3)
==5724==

### ASan Report

=================================================================
==5955==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000020 at pc 0x000000401136 bp 0x7fffbd82f610 sp 0x7fffbd82f608
WRITE of size 4 at 0x602000000020 thread T0
    #0 0x401135 in main (/path/to/your/program+0x401135)
    #1 0x7f437a694b24 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x21b24)
    #2 0x40105d in _start (/path/to/your/program+0x40105d)

Address 0x602000000020 is a freed heap block, allocated at
    #0 0x7f437a7a6bba in malloc (/usr/lib/x86_64-linux-gnu/libasan.so.4+0xdebba)
    #1 0x4010ad in main (/path/to/your/program+0x4010ad)

### Use-after-return
#### Source code

#include <stdio.h>

int *createArray() {
    int array[3];
    return array;
}

int main() {
    int *ptr = createArray();
    ptr[0] = 10;  // Use-after-return

    printf("%d\n", ptr[0]);  // Avoid optimization
    return 0;
}

#### Valgrind Report

==6475== Use of uninitialised value of size 8
==6475==    at 0x1091A6: main (example.c:9)
==6475==

### ASan Report

=================================================================
==6702==ERROR: AddressSanitizer: stack-use-after-return on address 0x7ffd880a98ac at pc 0x0000004010eb bp 0x7ffd880a9890 sp 0x7ffd880a9888
WRITE of size 4 at 0x7ffd880a98ac thread T0
    #0 0x4010ea in main (/path/to/your/program+0x4010ea)
    #1 0x7f5128e6cb24 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x21b24)
    #2 0x40105d in _start (/path/to/your/program+0x40105d)

Address 0x7ffd880a98ac is located in stack of thread T0 at offset 28 in frame
    #0 0x4010a9 in createArray (/path/to/your/program+0x4010a9)

  This frame has 1 object(s):
    [32, 36) 'array' (line 3) <== Memory access at offset 28 is inside this variable

## ASan Out-of-bound Write bypass Redzone
### Source code

#include <stdlib.h>

int main() {
    int a[8];
    int *ptr = (int *)((char *)a + sizeof(int) * 8); // 將a的32位空間映射到b上
    *ptr = 10; // 越界寫入，繞過redzone

    return 0;
}

### Why
創建了一個包含8個整數的陣列a，然後將指標ptr指向了陣列b的位置，這個位置剛好是陣列a的redzone之後的位置。接著嘗試向ptr所指向的位置寫入資料。這個寫入操作剛好越過了redzone，但並沒有對redzone進行讀寫操作。
ASan不僅會檢測redzone記憶體區域的訪問情況，還會檢測redzone之後的記憶體區域的訪問情況。所以ASan能夠找到這個問題，並生成相應的報告。
