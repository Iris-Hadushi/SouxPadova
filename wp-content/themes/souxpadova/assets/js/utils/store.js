export const app = {
    loading: true,
    nav: undefined,
    scroll: undefined,
    cursor: undefined,
    loader: undefined,
    progressiveimg: undefined,
    renderer: undefined,
    components: undefined,
    transition: undefined,
    detect: undefined,
    theme: undefined,
};

export const math = {
    lerp: (a, b, n) => (1 - n) * a + n * b,
};

export const stagger = (e) => {
    e.style.display = '';
    e.style.position = '';

    const d = document.createElement('div');

    d.classList.add('line');

    e.parentNode.insertBefore(d, e);

    d.appendChild(e);
}

export const wrap = (e) => {
    e.removeAttribute('style');

    const d = document.createElement('div');
    const p = document.createElement('div');

    d.classList.add('cube');
    p.classList.add('perspective');

    e.parentNode.insertBefore(p, e);

    d.appendChild(e);
    p.appendChild(d);
}
