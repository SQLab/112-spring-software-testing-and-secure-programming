Name: 林庭亘
ID: 510558006

### Fuzz Monitor
```
 american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 45 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 14 sec       │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 35 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 36 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.77 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (12.50%)             │
│ stage execs : 438/1848 (23.70%)     │  new edges on : 2 (25.00%)             │
│ total execs : 1291                  │ total crashes : 50 (1 unique)          │
│  exec speed : 53.02/sec (slow!)     │  total tmouts : 113 (3 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
────────────────────────────────────────────────────┘          [cpu000: 76%]
=======
### Run Crash Result
```
tingegg@tingegg-VirtualBox:~/510558006_112-spring-software-testing-and-secure-programming/lab6/fuzz$ ../src/bmpcomp out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20 
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==30050==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc7005e2f8 (pc 0x5ccf6f63b116 bp 0x7ffc7085c750 sp 0x7ffc7005d300 T0)
    #0 0x5ccf6f63b116 in main /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x77823b429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x77823b429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ccf6f63bac4 in _start (/home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2ac4)

SUMMARY: AddressSanitizer: stack-overflow /home/tingegg/510558006_112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==30050==ABORTING
=======
```
