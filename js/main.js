const isMobile = {
    Android: () => { return navigator.userAgent.match(/Android/i); },
    BlackBerry: () => { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: () => { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: () => { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: () => { return navigator.userAgent.match(/IEMobile/i); },
    any: () => { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
}

const body = document.body,
    wrapper = document.querySelector('.wrapper'),
    burgerDiv = document.querySelector('.header__burger'),
    menuDiv = document.querySelector('.menu'),
    listItems = document.querySelectorAll('.menu__item'),
    activeClass = document.querySelectorAll('.menu .active'),
    triggers = document.querySelectorAll('.arrow'),
    triggersImg = document.querySelectorAll('.arrow img'),
    subMenu = document.querySelectorAll('.sub-menu'),
    subSubMenu = document.querySelectorAll('.sub-sub-menu'),
    allMenu = [...subMenu, ...subSubMenu],
    imgUpSrc = './img/icon/up-arrow.svg',
    imgDownSrc = './img/icon/down-arrow.svg',
    test = document.querySelectorAll('menu')

if (isMobile.any()) {
    body.classList.add('touch')
} else {
    body.classList.add('mouse')
}

const switchClasses = classString => {
    return (switchClassTo, ...elem) => {
        switch (switchClassTo) {
            case 'add':
                for (let currentElem of elem) {
                    currentElem.classList.add(classString)
                }
                break;
            case 'remove':
                for (let currentElem of elem) {
                    currentElem.classList.remove(classString)
                }
                break;
            default:
                return;
        }
    }
}

const closeAllMenuIco = () => {
    triggersImg.forEach(item => {
        item.src = imgDownSrc
    })
}

const closeMenu = (menuArr) => {
    triggers.forEach(trigger => {
        trigger.classList.remove('active')
    })
    menuArr.forEach(item => {
        item.classList.remove('active')
    })
}

const wrapperBlurToggler = switchClasses('wrapper-blur'),
    burgerMobileToggler = switchClasses('active'),
    lockBodyToggler = switchClasses('lock'),
    mobileMenuToggler = switchClasses('active')


listItems.forEach(list => {
    if (!isMobile.any()) {
        list.onmouseover = () => {
            if (window.matchMedia("(min-width: 700px)").matches)
                wrapperBlurToggler('add', wrapper)
        }
        list.onmouseleave = () => {
            if (window.matchMedia("(min-width: 700px)").matches)
                wrapperBlurToggler('remove', wrapper)
        }
    }
})

burgerDiv.addEventListener('click', e => {
    const isActive = burgerDiv.classList.contains('active')
    if (!isActive) {
        burgerMobileToggler('add', burgerDiv, menuDiv)
        wrapperBlurToggler('add', wrapper)
        lockBodyToggler('add', body)
    } else {
        burgerMobileToggler('remove', burgerDiv, menuDiv)
        wrapperBlurToggler('remove', wrapper)
        lockBodyToggler('remove', body)
    }
})

triggers.forEach(item => {
    const currentSubMenu = item.nextElementSibling

    item.addEventListener('click', () => {
        if (currentSubMenu.classList.contains('active')) {
            mobileMenuToggler('remove', currentSubMenu, item)
            item.firstChild.src = imgDownSrc
            item.style.borderLeft = '1px solid #d0d3cf'
            item.scrollIntoView();
            return
        } else if (currentSubMenu.classList.contains('sub-menu')) {
            closeMenu(allMenu)
        } else {
            closeMenu(subSubMenu)
        }
        mobileMenuToggler('add', currentSubMenu, item)
        closeAllMenuIco()
        allMenu.forEach(item => {
            const previusElem = item.previousElementSibling
            if (item.classList.contains('active')) {
                previusElem.firstChild.src = imgUpSrc
                previusElem.style.borderLeft = 'none'
            } else {
                previusElem.style.borderLeft = '1px solid #d0d3cf'
            }
        })
        item.scrollIntoView();
    })
})