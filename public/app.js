const defaultPlans = [
	{ id: 1, title: 'Review the Q3 product notes', duration: '45 min', tag: 'Deep work', tone: 'deep', done: true },
	{ id: 2, title: 'Send follow-up to design team', duration: '20 min', tag: 'Quick win', tone: 'quick', done: true },
	{ id: 3, title: 'Sketch ideas for the new landing page', duration: '1 hour', tag: 'Creative', tone: 'creative', done: false },
	{ id: 4, title: 'Take a proper lunch break', duration: '30 min', tag: 'Wellbeing', tone: 'done', done: false },
	{ id: 5, title: 'Set tomorrow\'s one clear intention', duration: '10 min', tag: 'Quick win', tone: 'quick', done: true }
];

const planList = document.querySelector('#plan-list');
const planDialog = document.querySelector('#plan-dialog');
const planForm = document.querySelector('#plan-form');
const noteField = document.querySelector('#quick-note');
let plans = loadPlans();

function loadPlans() {
	try {
		return JSON.parse(localStorage.getItem('slate-plans')) || defaultPlans;
	} catch (error) {
		return defaultPlans;
	}
}

function savePlans() {
	localStorage.setItem('slate-plans', JSON.stringify(plans));
}

function renderPlans() {
	planList.innerHTML = plans.map((plan) => `
		<article class="plan-card${plan.done ? ' done' : ''}">
			<button class="check-button" type="button" data-plan-id="${plan.id}" aria-label="Mark ${plan.title} ${plan.done ? 'open' : 'complete'}">${plan.done ? '✓' : ''}</button>
			<div><p class="plan-title">${escapeHtml(plan.title)}</p><p class="plan-meta">${plan.duration} · Today</p></div>
			<span class="plan-tag tag-${plan.tone}">${plan.tag}</span>
		</article>`).join('');
	const completed = plans.filter((plan) => plan.done).length;
	document.querySelector('#focus-progress').textContent = `${completed} of ${plans.length} tasks done`;
}

function escapeHtml(value) {
	return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

planList.addEventListener('click', (event) => {
	const button = event.target.closest('[data-plan-id]');
	if (!button) return;
	const plan = plans.find((item) => item.id === Number(button.dataset.planId));
	if (!plan) return;
	plan.done = !plan.done;
	savePlans();
	renderPlans();
});

document.querySelector('#open-plan').addEventListener('click', () => planDialog.showModal());
planForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(planForm);
	plans.push({ id: Date.now(), title: formData.get('title'), duration: formData.get('duration'), tag: 'New plan', tone: 'deep', done: false });
	savePlans();
	renderPlans();
	planForm.reset();
	planDialog.close();
});

noteField.value = localStorage.getItem('slate-note') || '';
noteField.addEventListener('input', () => localStorage.setItem('slate-note', noteField.value));
const currentDate = new Date();
const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
document.querySelector('#today-label').textContent = dateFormatter.format(currentDate);
document.querySelector('#plans-date').textContent = dateFormatter.format(currentDate);
renderPlans();
