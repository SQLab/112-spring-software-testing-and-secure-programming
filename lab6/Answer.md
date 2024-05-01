Name: 張又仁
ID: 511558009

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 32 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 2 sec        │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 24 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 19 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.77 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (12.50%)             │
│ stage execs : 203/221 (91.86%)      │  new edges on : 2 (25.00%)             │
│ total execs : 756                   │ total crashes : 40 (1 unique)          │
│  exec speed : 8.39/sec (zzzz...)    │  total tmouts : 99 (5 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 3/223, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001:203%]

```

### Run Crash Result
```
root@NYCU-LAB:/home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6# cd fuzz/
root@NYCU-LAB:/home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6/fuzz# ls out/
crashes  fuzz_bitmap  fuzzer_stats  hangs  plot_data  queue
root@NYCU-LAB:/home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6/fuzz# ls out/queue/
id:000000,orig:1.bmp                  id:000002,src:000000,op:flip1,pos:22  id:000004,src:000000,op:flip2,pos:18,+cov  id:000006,src:000000,op:flip2,pos:22
id:000001,src:000000,op:flip1,pos:22  id:000003,src:000000,op:flip1,pos:22  id:000005,src:000000,op:flip2,pos:22       id:000007,src:000000,op:flip4,pos:22
root@NYCU-LAB:/home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6/fuzz# ls out/crashes/
id:000000,sig:06,src:000000,op:flip1,pos:20  README.txt
root@NYCU-LAB:/home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6/fuzz# ../src/bmpcomp out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20 
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==48921==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd278665a8 (pc 0x581f18e94f7d bp 0x7ffd28064a00 sp 0x7ffd278655b0 T0)
    #0 0x581f18e94f7d in main /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x783ea8e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x783ea8e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x581f18e95b64 in _start (/home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2b64)

SUMMARY: AddressSanitizer: stack-overflow /home/jen/Desktop/Lab1/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==48921==ABORTING
```
