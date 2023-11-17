import TabInfo from '@/components/tab/TabInfo';

export default function TermsAndConditions() {
    const tabs = [
        'Aceitação dos Termos',
        'Uso do Sistema',
        'Privacidade',
        'Responsabilidades',
        'Alterações nos Termos',
        'Contato',
    ];
    const content = [
        <>
            <p>Ao acessar ou usar o RobDroneGo, você concorda em ficar vinculado a estes Termos e Condições de Uso.</p>
        </>,
        <>
            <p>
                O RobDroneGo destina-se ao uso para gestão de tarefas de robôs e drones no campus do ISEP. Qualquer uso
                indevido ou não autorizado do sistema pode resultar em ações legais.
            </p>
        </>,
        <>
            <p>
                Ao utilizar o sistema, você concorda com a política de privacidade, incluindo a coleta e uso de
                informações conforme descrito no documento de privacidade.
            </p>
        </>,

        <>
            <p>
                Os administradores, gestores de frota e utentes são responsáveis por garantir o uso adequado do sistema.
                A equipe do RobDroneGo não é responsável por danos causados por uso indevido ou falhas no sistema.
            </p>
        </>,
        <>
            <p>
                Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento. As alterações entrarão
                em vigor imediatamente após a publicação no site. Recomendamos revisar periodicamente os Termos e
                Condições.
            </p>
        </>,
        <>
            <p>
                Se tiver dúvidas ou preocupações sobre estes Termos e Condições, entre em contato conosco pelo e-mail:
                contato@robdronego.com.
            </p>
        </>,
    ];

    return (
        <div className="container">
            <h1 className="text-center">Termos e Condições</h1>
            <br />
            <TabInfo tabs={tabs} content={content} />
        </div>
    );
}
