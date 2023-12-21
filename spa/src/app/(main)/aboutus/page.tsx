import TabInfo from '@/components/tab/TabInfo';

export default function AboutUs() {
    const tabs = ['Intended purpose', 'Overview', 'Campus map', 'Robot Tasks', 'Demonstration', 'Contact'];
    const content = [
        <>
            <p>
                RobDroneGo is a prototype developed to manage a fleet of robots and drones on the ISEP campus. ISEP
                CAMPUS. It consists of the following modules:
            </p>
            <ul>
                <li>Device management</li>
                <li>Task request management</li>
                <li>Planning the execution of tasks</li>
            </ul>
            <p>
                This system aims to facilitate tasks such as transporting objects, surveillance and deliveries, among
                others, using mobile robots (robisep) and drones (droneisep).
            </p>
        </>,
        <>
            <p>
                ISEP purchases two types of device: robisep, for internal movement in buildings, and droneisep, for
                operations in outer space. Different users, such as administrators, fleet and users (students, teachers,
                staff) interact with the system to manage devices and request tasks. request tasks.
            </p>
            <p>
                The solution will make it possible to configure robots and drones, registering users to request tasks
                such as deliveries or surveillance. The system will evaluate and stagger requests, planning routes using
                the campus map. campus.
            </p>
        </>,
        <>
            <p>
                The map includes buildings, floors, corridors and lifts, allowing for efficient navigation. Each floor
                has a matrix map with detailed information, including rooms, lifts and passages between floors.
            </p>
        </>,

        <>
            <p>
                Robots can carry out tasks such as transporting objects and surveillance. Safety considerations, such as
                collision avoidance and data protection, are paramount. Local sensors enable navigation, although for
                prototyping purposes, average navigation times are used.
            </p>
        </>,
        <>
            <p>
                The solution will be demonstrated with a campus made up of at least 5 buildings, interconnected for
                circulation between all the buildings. circulation between all the buildings, each floor with 3 to 5
                floors and an average of 10 offices/rooms per floor.
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
            <h1 className="text-center">About Us</h1>
            <br />
            <TabInfo tabs={tabs} content={content} />
        </div>
    );
}
