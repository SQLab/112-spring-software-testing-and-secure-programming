Name: 林志嘉
ID: 512558004

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 8 min, 37 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 13 sec       │  total paths : 23     │
│ last uniq crash : 0 days, 0 hrs, 8 min, 28 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 7 min, 52 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 1 (4.35%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.47 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 3 (13.04%)             │
│ stage execs : 1026/1035 (99.13%)    │  new edges on : 4 (17.39%)             │
│ total execs : 8165                  │ total crashes : 859 (1 unique)         │
│  exec speed : 5.83/sec (zzzz...)    │  total tmouts : 1227 (8 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/384, 3/382, 2/378                   │    levels : 3          │
│  byte flips : 0/48, 0/46, 0/42                      │   pending : 22         │
│ arithmetics : 9/2682, 0/1029, 0/678                 │  pend fav : 3          │
│  known ints : 1/94, 2/365, 0/586                    │ own finds : 22         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/204, 0/0                            │ stability : 100.00%    │
│        trim : 100.00%/40, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000:157%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==441231==ERROR: AddressSanitizer: stack-overflow on address 0x7fff10caef38 (pc 0x55a150e5c03a bp 0x7fff124afc90 sp 0x7fff10caef40 T0)                                                          
    #0 0x55a150e5c03a in main /home/kali/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7fa521246189  (/lib/x86_64-linux-gnu/libc.so.6+0x27189) (BuildId: b1c6521cd0ab872b70c21377654e966ea9d438c9)
    #2 0x7fa521246244 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x27244) (BuildId: b1c6521cd0ab872b70c21377654e966ea9d438c9)
    #3 0x55a150e5cad0 in _start (/home/kali/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2ad0) (BuildId: ddc31470adbba3baa0ad6828e449a5b63f414027)

SUMMARY: AddressSanitizer: stack-overflow /home/kali/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==441231==ABORTING
```
