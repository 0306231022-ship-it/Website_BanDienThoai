    <div className="flex justify-end gap-3">
                                 <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Hủy</button>
                                 <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"> Xác nhận</button>
                            </div>
        
               {/* --- VIEW 3: THÀNH PHẦN SỬA ẢNH (LOGO) --- */}
        <div className="w-1/3 flex-shrink-0 px-6 pt-6 bg-white">
          <button  className="flex items-center text-gray-500 mb-6 hover:text-purple-600 transition-colors">
            <i className="fa-solid fa-arrow-left-long mr-2"></i> Quay lại
          </button>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Cập nhật Logo</h3>
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <img 
               // src={`http://localhost:3001${modalState.DuLieu.LoGo}`} 
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-50 shadow-inner"
              />
              <label className="absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <i className="fa-solid fa-camera"></i>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            
            <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl text-center">
              <p className="text-sm text-gray-400">Dung lượng tối đa 2MB. Hỗ trợ JPG, PNG.</p>
            </div>

            <button className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-purple-700 active:scale-95 transition-all">
              Tải lên logo mới
            </button>
          </div>
        </div>