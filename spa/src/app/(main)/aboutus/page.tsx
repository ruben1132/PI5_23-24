import TabInfo from '@/components/tab/TabInfo';

export default function AboutUs() {
    const tabs = ['Objeto Pretendido', 'Visão Geral', 'Mapa do Campus', 'Tarefas dos Robôs', 'Demonstração', 'Contato'];
    const content = [
        <>
            <p>
                O RobDroneGo é um protótipo desenvolvido para a gestão de uma frota de robots e drones no campus do
                ISEP. Ele é composto pelos seguintes módulos:
            </p>
            <ul>
                <li>Gestão de dispositivos</li>
                <li>Gestão de requisição de tarefas</li>
                <li>Planeamento de execução de uma tarefa</li>
            </ul>
            <p>
                Este sistema visa facilitar tarefas como transporte de objetos, vigilância, entregas, entre outras,
                utilizando robôs móveis (robisep) e drones (droneisep).
            </p>
        </>,
        <>
            <p>
                O ISEP adquire dois tipos de dispositivos: robisep, para movimentação interna nos edifícios, e
                droneisep, para operações no espaço exterior. Diferentes utilizadores, como administradores, gestores de
                frota e utentes (alunos, docentes, funcionários), interagem com o sistema para gerir dispositivos e
                requisitar tarefas.
            </p>
            <p>
                A solução permitirá configurar robôs e drones, registrando utentes para solicitar tarefas como entregas
                ou vigilância. O sistema avaliará e escalonará os pedidos, planejando percursos através do mapa do
                campus.
            </p>
        </>,
        <>
            <p>
                O mapa inclui edifícios, pisos, corredores e elevadores, permitindo uma navegação eficiente. Cada piso
                tem um mapa matricial com informações detalhadas, incluindo salas, elevadores e passagens entre pisos.
            </p>
        </>,

        <>
            <p>
                Os robôs podem executar tarefas como transporte de objetos e vigilância. Considerações de segurança,
                como evitar colisões e proteção de dados, são fundamentais. Sensores locais permitem a navegação, embora
                para efeitos de protótipo, sejam utilizados tempos médios de navegação.
            </p>
        </>,
        <>
            <p>
                A solução será demonstrada com um campus composto por pelo menos 5 edifícios, interligados para
                circulação entre todos os edifícios, cada piso com 3 a 5 pisos e em média 10 gabinetes/salas por piso.
            </p>
        </>,
        <>
            <ul>
                <li>robdronego@isep.ipp.pt</li>
                <li>22 834 0500</li>
            </ul>
        </>,
    ];

    return (
        <div className="container">
            <h1 className="text-center">Sobre Nós</h1>
            <br />
            <TabInfo tabs={tabs} content={content} />
        </div>
    );
}
