class galeryAnimations {

    images(){
        return Array.from(document.querySelectorAll('.img-container'))
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    showGalery(){
        this.images().forEach((el, i) => {
            setTimeout(() => {
                el.classList.remove('hide');
            }, 35*i);
        })
    }

    async hideGalery(){
        new Promise((resolve) => {
            this.images().forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('hide');
                }, 35*i);
            })
            setTimeout(() => {
                resolve();
            }, 35*(this.images().length + 1));
        })
    }
}

export default new galeryAnimations();