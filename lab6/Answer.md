Name: 陳谷安
ID: 512558008

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 3 min, 53 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 38 sec       │  total paths : 14     │
│ last uniq crash : 0 days, 0 hrs, 3 min, 35 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 5 sec        │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.64 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (7.14%)              │
│ stage execs : 1361/1612 (84.43%)    │  new edges on : 3 (21.43%)             │
│ total execs : 2265                  │ total crashes : 139 (1 unique)         │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 273 (7 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/224, 2/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 14         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 13         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu: 97%]


```

### Run Crash Result
```
ubuntu@ubuntu-VirtualBox:~/桌面/lab6/fuzz$ ../src/bmpcomp ./out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20 
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==7258==ERROR: AddressSanitizer: stack-overflow on address 0x7ffdcca2b5b8 (pc 0x55e21dad3135 bp 0x7ffdcd22aa10 sp 0x7ffdcca2a5c0 T0)
    #0 0x55e21dad3134 in main /home/ubuntu/桌面/lab6/src/hw0302.c:46
    #1 0x7fd40d529082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55e21dad3c1d in _start (/home/ubuntu/桌面/lab6/src/bmpcomp+0x2c1d)

SUMMARY: AddressSanitizer: stack-overflow /home/ubuntu/桌面/lab6/src/hw0302.c:46 in main
==7258==ABORTING

```
