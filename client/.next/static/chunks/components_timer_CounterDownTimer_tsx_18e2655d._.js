(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/timer/CounterDownTimer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TimerDisplay": (()=>TimerDisplay),
    "useCountdownTimer": (()=>useCountdownTimer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
function useCountdownTimer(targetDateString) {
    _s();
    const [timerObj, setTimerObj] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = new Date(targetDateString);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountdownTimer.useEffect": ()=>{
            function calculateTime() {
                const now = new Date();
                const diff = targetDate.getTime() - now.getTime();
                if (diff <= 0) {
                    return {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    };
                }
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
                const minutes = Math.floor(diff / (1000 * 60) % 60);
                const seconds = Math.floor(diff / 1000 % 60);
                return {
                    days,
                    hours,
                    minutes,
                    seconds
                };
            }
            function updateCountdown() {
                const newTime = calculateTime();
                setTimerObj({
                    "useCountdownTimer.useEffect.updateCountdown": (prev)=>{
                        const isSame = prev.days === newTime.days && prev.hours === newTime.hours && prev.minutes === newTime.minutes && prev.seconds === newTime.seconds;
                        return isSame ? prev : newTime;
                    }
                }["useCountdownTimer.useEffect.updateCountdown"]);
                if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
                    clearInterval(intervalRef.current);
                    alert("Time is up!");
                }
            }
            intervalRef.current = setInterval(updateCountdown, 1000);
            updateCountdown(); // Initial call
            return ({
                "useCountdownTimer.useEffect": ()=>clearInterval(intervalRef.current)
            })["useCountdownTimer.useEffect"]; // Cleanup
        }
    }["useCountdownTimer.useEffect"], [
        targetDateString
    ]);
    return timerObj;
}
_s(useCountdownTimer, "jR5/w9DrQw8ioq31hff5gL25CpY=");
function TimerDisplay() {
    _s1();
    const { days, hours, minutes, seconds } = useCountdownTimer("2025-07-14T23:59:59");
    const GlassCard = ({ item, metric })=>{
        const styles = {
            glassCard: {
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.glassCard,
            className: `glass-card p-4 rounded-xl text-center transform hover:-translate-y-2 transition-all`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold text-white",
                    children: item
                }, void 0, false, {
                    fileName: "[project]/components/timer/CounterDownTimer.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-white/70 text-sm",
                    children: metric
                }, void 0, false, {
                    fileName: "[project]/components/timer/CounterDownTimer.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/timer/CounterDownTimer.tsx",
            lineNumber: 90,
            columnNumber: 14
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-4 gap-4 mb-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                item: days,
                metric: "Days"
            }, void 0, false, {
                fileName: "[project]/components/timer/CounterDownTimer.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                item: hours,
                metric: "Hours"
            }, void 0, false, {
                fileName: "[project]/components/timer/CounterDownTimer.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                item: minutes,
                metric: "Minutes"
            }, void 0, false, {
                fileName: "[project]/components/timer/CounterDownTimer.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                item: seconds,
                metric: "Seconds"
            }, void 0, false, {
                fileName: "[project]/components/timer/CounterDownTimer.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/timer/CounterDownTimer.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s1(TimerDisplay, "L9QbvqRB8XgAItkWa6/K0HcUMPA=", false, function() {
    return [
        useCountdownTimer
    ];
});
_c = TimerDisplay;
var _c;
__turbopack_context__.k.register(_c, "TimerDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_timer_CounterDownTimer_tsx_18e2655d._.js.map