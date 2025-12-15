// SISTEMA DE MODAL/POP-UP PARA PIZZARIA PAULISTA

class ModalSystem {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.init();
    }

    init() {
        this.createModalStructure();
        this.bindEvents();
    }

    createModalStructure() {
        // Criar overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Criar modal
        this.modal = document.createElement('div');
        this.modal.className = 'modal-popup';
        this.modal.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: var(--white);
            border-radius: 12px;
            box-shadow: var(--shadow);
            z-index: 9999;
            max-width: 90vw;
            max-height: 90vh;
            width: auto;
            min-width: 300px;
            opacity: 0;
            transition: all 0.3s ease;
            overflow: hidden;
        `;

        // Botão fechar
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        closeBtn.addEventListener('click', () => this.close());

        // Conteúdo do modal
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            padding: 40px 30px 30px;
            max-height: 80vh;
            overflow-y: auto;
        `;

        this.modal.appendChild(closeBtn);
        this.modal.appendChild(modalContent);
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);

        // Fechar modal ao clicar no overlay
        this.overlay.addEventListener('click', () => this.close());

        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display !== 'none') {
                this.close();
            }
        });
    }

    bindEvents() {
        // Interceptar cliques nos links de opening
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a.working_day');
            if (link && link.getAttribute('href') === 'modal/opening.html') {
                e.preventDefault();
                this.loadOpeningHours();
            }
        });
    }

    loadOpeningHours() {
        // Criar o conteúdo diretamente em vez de carregar de arquivo externo
        const openingContent = `
            <div class="opening_popup">
                <div>
                    <h3>Nossos Horários</h3>
                    <h4>JANTAR</h4>
                    <ul>
                        <li><span class="week-day">Segunda-feira</span> <span class="week-time">FECHADO</span></li>
                        <li><span class="week-day">Terça-feira</span> <span class="week-time">18:00 - 22:30h</span></li>
                        <li><span class="week-day">Quarta-feira</span> <span class="week-time">18:00 - 22:30h</span></li>
                        <li><span class="week-day">Quinta-feira</span> <span class="week-time">18:00 - 22:30h</span></li>
                        <li><span class="week-day">Sexta-feira</span> <span class="week-time">18:00 - 22:30h</span></li>
                        <li><span class="week-day">Sábado</span> <span class="week-time">18:00 - 22:30h</span></li>
                        <li><span class="week-day">Domingo</span> <span class="week-time">18:00 - 22:30h</span></li>
                    </ul>
                </div>
            </div>
        `;
        
        this.show(openingContent);
    }

    show(content) {
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.innerHTML = content;

        // Aplicar estilos ao conteúdo
        this.applyModalStyles();

        // Mostrar modal
        this.overlay.style.display = 'block';
        this.modal.style.display = 'block';
        
        // Animar entrada
        setTimeout(() => {
            this.overlay.style.opacity = '1';
            this.modal.style.opacity = '1';
            this.modal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    }

    applyModalStyles() {
        // Estilizar o conteúdo do modal de horários
        const modalContent = this.modal.querySelector('.modal-content');
        
        // Estilos para títulos
        const h3 = modalContent.querySelector('h3');
        if (h3) {
            h3.style.cssText = `
                color: var(--primary-color);
                font-size: 1.8rem;
                margin-bottom: 20px;
                text-align: center;
                font-weight: 700;
            `;
        }

        const h4 = modalContent.querySelector('h4');
        if (h4) {
            h4.style.cssText = `
                color: var(--secondary-color);
                font-size: 1.3rem;
                margin: 20px 0 15px;
                text-align: center;
                font-weight: 600;
            `;
        }

        // Estilos para lista de horários
        const ul = modalContent.querySelector('ul');
        if (ul) {
            ul.style.cssText = `
                list-style: none;
                padding: 0;
                margin: 0;
            `;
        }

        const liElements = modalContent.querySelectorAll('li');
        liElements.forEach(li => {
            li.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid var(--border-color);
            `;
        });

        const weekDays = modalContent.querySelectorAll('.week-day');
        weekDays.forEach(day => {
            day.style.cssText = `
                font-weight: 600;
                color: var(--text-color);
                font-size: 1rem;
            `;
        });

        const weekTimes = modalContent.querySelectorAll('.week-time');
        weekTimes.forEach(time => {
            time.style.cssText = `
                color: var(--primary-color);
                font-weight: 600;
                font-size: 1rem;
            `;
        });

        // Destacar dias fechados
        const closedDays = modalContent.querySelectorAll('.week-time');
        closedDays.forEach(time => {
            if (time.textContent.includes('FECHADO')) {
                // use CSS variable so color follows dark/light theme
                time.style.color = 'var(--primary-color)';
                time.style.fontWeight = '700';
            }
        });
    }

    close() {
        // Animar saída
        this.overlay.style.opacity = '0';
        this.modal.style.opacity = '0';
        this.modal.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
            this.modal.style.display = 'none';
        }, 300);
    }
}

// Inicializar sistema de modal quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.modalSystem = new ModalSystem();
});
