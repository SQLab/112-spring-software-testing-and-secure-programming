Name: 
ID: 510558017

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 4 min, 14 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 23 sec       │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 3 min, 22 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 49 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.83 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (12.50%)             │
│ stage execs : 1107/1958 (56.54%)    │  new edges on : 3 (37.50%)             │
│ total execs : 2132                  │ total crashes : 48 (1 unique)          │
│  exec speed : 2.29/sec (zzzz...)    │  total tmouts : 404 (4 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 2/256, 4/255, 1/253                   │    levels : 2          │
│  byte flips : 0/32, 0/31, 0/29                      │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/112, 0.00%                    ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000: 24%]

```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==7282==ERROR: AddressSanitizer: stack-overflow on address 0x7ffeba94bc08 (pc 0x55e7f4b4017b bp 0x7ffebb14a060 sp 0x7ffeba94ac10 T0)
    #0 0x55e7f4b4017a in main /home/jf/510558017/510558017/lab6/src/hw0302.c:46
    #1 0x7f4dd92d5082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55e7f4b40d5d in _start (/home/jf/510558017/510558017/lab6/src/bmpcomp+0x2d5d)

SUMMARY: AddressSanitizer: stack-overflow /home/jf/510558017/510558017/lab6/src/hw0302.c:46 in main
==7282==ABORTING

```
