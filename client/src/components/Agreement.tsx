const Agreement = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">User Agreement</h1>
            <p className="text-center mb-4">
                By using this application, you agree to the following terms and conditions:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>All data provided is for informational purposes only.</li>
                <li>We are not responsible for any actions taken based on the information provided.</li>
                <li>Your data will be handled according to our privacy policy.</li>
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Accept</button>
        </div>

    )
}

export default Agreement;