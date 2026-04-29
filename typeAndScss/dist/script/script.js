var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { data as fetchTodo } from "./api.js";
var todo;
function fetchTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchTodo('')];
                case 1:
                    todo = _a.sent();
                    renderTodos(todo);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to fetch todos:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderTodos(data) {
    var container = document.querySelector('.container');
    if (container && (data === null || data === void 0 ? void 0 : data.todos)) {
        container.innerHTML = data.todos.map(function (element) { return "\n            <div class=\"todo\" id=\"".concat(element.id, "\">\n                <span class=\"todo-text ").concat(element.completed ? 'completed' : '', "\">").concat(element.todo, "</span>\n                <input type=\"checkbox\" ").concat(element.completed ? 'checked' : '', ">\n            </div>\n        "); }).join('');
    }
}
var filters = {
    all: document.querySelector('.all'),
    active: document.querySelector('.active'),
    completed: document.querySelector('.completed')
};
Object.entries(filters).forEach(function (_a) {
    var key = _a[0], el = _a[1];
    el === null || el === void 0 ? void 0 : el.addEventListener('click', function () { return filterFunction(key); });
});
function filterFunction(filterType) {
    var _a;
    var filteredList = todo.todos.filter(function (t) {
        return filterType === 'all' ? true :
            filterType === 'active' ? !t.completed : t.completed;
    });
    Object.values(filters).forEach(function (el) { return el === null || el === void 0 ? void 0 : el.classList.remove('live'); });
    (_a = filters[filterType]) === null || _a === void 0 ? void 0 : _a.classList.add('live');
    renderTodos({
        todos: filteredList,
        total: filteredList.length,
        skip: 0,
        limit: filteredList.length
    });
}
document.addEventListener('DOMContentLoaded', fetchTodos);
//# sourceMappingURL=script.js.map