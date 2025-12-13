import React, { useState } from 'react';
const ChinhSua = () => {

    
    return (
        <div 
            id="singleEditModal" 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
           
        >
            <div 
                className="bg-white rounded-xl shadow-3xl w-full max-w-lg p-6 transition-all duration-300 transform scale-100"
                onClick={e => e.stopPropagation()} // Ngăn chặn sự kiện nổi bọt (không đóng modal)
            >
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-700" id="modalTitle">⚙️ Sửa: 123</h3>
                    <button  className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-transform duration-200 hover:rotate-90">&times;</button>
                </div>
                <form className="space-y-4">
                    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <p className="text-sm font-medium text-indigo-600 mb-1">Giá trị hiện tại:</p>
                        <p className="text-lg font-extrabold text-indigo-900 break-words" id="currentValueDisplay">1324254</p>
                    </div>
                    
                    <div>
                        <label htmlFor="newValueInput" className="block text-sm font-medium text-gray-700 mb-1" id="labelNewValue"> mới:</label>
                         <input type='text' id="newValueInput" required className="w-full border border-gray-300 rounded-lg shadow-inner p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />
                        <input type="hidden" id="editingFieldId" value='123' /> 
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                        <button type="button"  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-150">Hủy</button>
                        <button type="button"  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 hover:bg-red-50 rounded-lg transition duration-150">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356-2A8.001 8.001 0 004.582 19.42M20 20v-5h-.581m0 0a8.003 8.003 0 01-15.357-2.14m15.357 2.14l-.001-.001"></path></svg>
                                Reset
                            </span>
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition duration-150">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ChinhSua;