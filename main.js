document.addEventListener('DOMContentLoaded', function () {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100,
    });

    // 移动菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // 关闭点击链接后的菜单
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // 为Hero区域添加视差效果
        document.querySelector('.hero').style.backgroundPositionY = scrolled * 0.5 + 'px';
        
        // 平滑导航栏
        if (scrolled > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });

    // 添加交互式功能卡片效果
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // 获取鼠标在卡片上的相对位置
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // 计算旋转角度
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // 应用3D效果
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // 重置效果
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // 模块卡片鼠标悬停效果增强
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        const image = card.querySelector('.module-image');
        
        card.addEventListener('mouseenter', function() {
            image.style.height = '240px';
        });
        
        card.addEventListener('mouseleave', function() {
            image.style.height = '220px';
        });
    });

    // 添加动态波浪效果到CTA区域
    const cta = document.querySelector('.cta');
    
    if (cta) {
        // 创建波浪元素
        const wave = document.createElement('div');
        wave.classList.add('wave');
        cta.appendChild(wave);
        
        // 波浪动画
        let wavePosition = 0;
        
        function animateWave() {
            wavePosition -= 1;
            wave.style.backgroundPositionX = wavePosition + 'px';
            requestAnimationFrame(animateWave);
        }
        
        animateWave();
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 80px 偏移以考虑固定导航栏
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加滚动观察器，实现更精细的动画控制
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                // 可选：当元素离开视口时移除类
                // entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1 // 当元素10%进入视口时触发
    });

    // 观察所有需要动画的元素
    document.querySelectorAll('.feature-card, .module-card, .testimonial-card, .app-screen').forEach(el => {
        scrollObserver.observe(el);
        
        // 添加初始类
        el.classList.add('scroll-animate');
    });

    // 添加交互式app屏幕展示效果
    const appScreens = document.querySelectorAll('.app-screen');
    
    appScreens.forEach(screen => {
        screen.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // 计算旋转角度，限制在较小范围内
            const rotateY = ((x / rect.width) - 0.5) * 20; // -10到10度
            
            this.style.transform = `rotateY(${rotateY}deg)`;
        });
        
        screen.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0)';
        });
    });

    // 为了使导航更智能，突出显示当前所在的部分
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
    
    // 添加灯光效果到特性卡片
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 计算光照位置
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});

// 添加额外的CSS规则（也可以放入CSS文件中）
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* 滚动后的导航栏样式 */
    .navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.98);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* 当前活动的导航链接 */
    .nav-links a.active {
        color: var(--primary);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    /* 滚动动画类 */
    .scroll-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.7s ease;
    }
    
    .scroll-animate.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* 波浪效果 */
    .wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="0.1" d="M0,96L60,117.3C120,139,240,181,360,176C480,171,600,117,720,101.3C840,85,960,107,1080,144C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>');
        background-size: 1600px 100px;
        background-repeat: repeat-x;
        z-index: 2;
    }
    
    /* 卡片光效 */
    .feature-card {
        position: relative;
        overflow: hidden;
    }
    
    .feature-card::before {
        content: '';
        position: absolute;
        top: var(--y, 0);
        left: var(--x, 0);
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }
    
    .feature-card:hover::before {
        opacity: 0.15;
    }
</style>
`);