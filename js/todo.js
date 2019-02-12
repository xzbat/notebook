const vm = new Vue({
	el: '#app',
	directives: {
		focus(el, bindings) {
			if (bindings.value) {
				el.focus();
			}
		}
	},
	data: {
		todos: [{
				isSelected: false,
				title: 'ABCA'
			},
			{
				isSelected: false,
				title: '运行测试'
			}
		],
		title: '',
		cur: '',
		hash:''
	},
	methods: {
		add() {
			this.todos.push({
				isSelected: false,
				title: this.title
			});
			this.title = '';
		},
		remove(todo) {
			this.todos = this.todos.filter(item => item !== todo);
		},
		remember(todo) {
			this.cur = todo;
		},
		cancel() {
			this.cur = ''
		}
	},
	watch: {
		todos: { //watch默认只监控一层变化，深度变化要把原来的todo函数(){}改成对象格式:{}
			handler() { //触发器
				//localStorage默认存的是字符串
				localStorage.setItem('data', JSON.stringify(this.todos));
			},
			deep: true //是否深度监控，是
		}
	},
	created() { //AJAX获取 初始化数据 页面刷新时触发的事件(执行的函数)
		//如果localStorage中有数据,就用有的数据,如果没有就用默认的
		this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
		//监控hash值变化
		//hush是浏览器自带的功能，所以加在window上,如果页面已经有hash值了重新刷新页面也要获取hash值
		this.hash = window.location.hash.slice(2) || 'all';
		//如果有hash值就截取前两位赋值给页面刷新后的hash值，如果没有就赋默认值
		//slice截取hash值前(2)位
		window.addEventListener('hashchange', () => {
			//当hash值变化重新操作记录的数据
			this.hash = window.location.hash.slice(2);
		}, false);

	},
	

	computed: {
		filterTodos() {
			if (this.hash === 'all') return this.todos
			if (this.hash === 'finish') return this.todos.filter(
				item => item.isSelected);
			if (this.hash === 'unfinish') return this.todos.filter(
				item => !item.isSelected);
			return this.todos;
		},
		count() { //直接写就是get
			return this.todos.filter(item => !item.isSelected).length;
		}
	}
})
