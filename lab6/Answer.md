Name: 
ID: 

### Fuzz Monitor
```
![image](https://github.com/toey8612/112-spring-software-testing-and-secure-programming/assets/37663339/10627090-66b9-49f5-8c03-887a5d43cbdc)

 american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 2 min, 2 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 28 sec       │  total paths : 18     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 54 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.12 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 1 (5.56%)              │
│ stage execs : 468/2599 (18.01%)     │  new edges on : 4 (22.22%)             │
│ total execs : 2962                  │ total crashes : 121 (1 unique)         │
│  exec speed : 44.27/sec (slow!)     │  total tmouts : 369 (7 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 18         │
│ arithmetics : 7/1565, 0/0, 0/0                      │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 17         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  7%]

```

### Run Crash Result
```
![image](https://github.com/toey8612/112-spring-software-testing-and-secure-programming/assets/37663339/5e59bd9f-faa3-4384-bfe6-e13a0c8a12f8)
+++ Testing aborted by user +++
[+] We're done here. Have a nice day!

(Lab6) liu@MSI:~/112-spring-software-testing-and-secure-programming/lab6/fuzz$ ls out/
crashes  fuzz_bitmap  fuzzer_stats  hangs  plot_data  queue
(Lab6) liu@MSI:~/112-spring-software-testing-and-secure-programming/lab6/fuzz$ ls out/crashes/
README.txt  id:000000,sig:06,src:000000,op:flip1,pos:20
(Lab6) liu@MSI:~/112-spring-software-testing-and-secure-programming/lab6/fuzz$ ../src/bmpcomp . /out/crashes/id\:000000,sig:06,src:000000,op:flip1,pos:20
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==208984==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd201229f8 (pc 0x556e8c08f11f bp 0x7ffd20920e50 sp 0x7ffd20121a00 T0)
    #0 0x556e8c08f11f in main /home/liu/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7f037a105d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f037a105e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x556e8c08fc24 in _start (/home/liu/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2c24)

SUMMARY: AddressSanitizer: stack-overflow /home/liu/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==208984==ABORTING
```
