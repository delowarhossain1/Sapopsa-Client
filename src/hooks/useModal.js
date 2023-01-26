import Swal from "sweetalert2";

const useModal = () => {

    const successFullModal = (text = 'Successfull') => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${text}`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    const deleteModal = (cb) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cb();
            }
        })
    }


    function simpleAlertWithConfirmBtn(info = {}, cb) {
        const { text = 'Are you sure?', confirmBtn = 'Ok' } = info;

        Swal.fire({
            title: `${text}`,
            showCancelButton: true,
            confirmButtonText: `${confirmBtn}`,
        }).then((result) => {

            if (result.isConfirmed) {
                cb();
            }
        })
    }

    const simpleMessageDisplay = (text = 'Set the title here') => {
        Swal.fire({
            title: `${text}`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }

    return {
        successFullModal,
        deleteModal,
        simpleAlertWithConfirmBtn,
        simpleMessageDisplay
    }
};

export default useModal;