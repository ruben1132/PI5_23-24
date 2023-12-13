'use client';

import Table from 'react-bootstrap/Table';
import { useFetchData, useModal } from '../../util/customHooks';
import { useState } from 'react';
import Modal from '../modals/Modal';
import MeekoLoader from '../loaders/MeekoLoader';
import Button from 'react-bootstrap/Button';
import RowItem from './RowItem';
import SadRaccoon from '../noData/SadRaccoon';
import { RenderFilteredSearch } from '../forms/search/RenderFilteredSearch';

interface Props {
    type: string;
    routeToFetch: string;
}

function ContentTable(props: Props) {
    const contentModal = useModal(false);
    const [itemClicked, setItemClicked] = useState<any>(null);
    const useFetchdata = useFetchData(props.routeToFetch);
    const [modalType, setModalType] = useState<string>('add');

    if (useFetchdata.isError) return <div>failed to load</div>;
    if (useFetchdata.isLoading) return <MeekoLoader />;

    const handleRowClick = (item: any) => {
        setItemClicked(item);
        setModalType('edit');
        contentModal.handleOpen();
    };

    const handleAddButtonClick = () => {
        setModalType('add');
        setItemClicked({});
        contentModal.handleOpen();
    };

    const addButton =
        // dont render for page users
        props.type === 'user' ? null : (
            <Button variant="success" onClick={handleAddButtonClick} data-testid="open-modal">
                Add {props.type}
            </Button>
        );

    const modal = (
        <Modal
            action={modalType}
            item={{ value: itemClicked, type: props.type }}
            fade={false}
            show={contentModal.show}
            close={contentModal.handleClose}
            reFetchData={useFetchdata.revalidate}
        />
    );

    // if there is no data to show
    if (useFetchdata.data === undefined || useFetchdata.data === null || useFetchdata.data.length <= 0)
        return (
            <>
                <SadRaccoon />
                {addButton}
                {contentModal.show && modal}
            </>
        );

    // filter out the id column
    const filteredColumns = Object.keys(useFetchdata.data[0]).filter(
        (column: string) => column !== 'id' && column !== 'password',
    );

    return (
        <>
            {contentModal.show && modal}

            {addButton}
            <br />
            <br />
            <Table striped>
                <thead>
                    <tr>
                        {filteredColumns.map((column: string, index: number) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {useFetchdata?.data.map((item: any, index: number) => (
                        <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                            {filteredColumns?.map((column: string, jindex: number) => (
                                <RowItem key={jindex} index={jindex} type={props.type} item={item[column]} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ContentTable;
