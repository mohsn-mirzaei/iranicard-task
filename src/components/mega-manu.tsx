export function MegaMenu() {
    return (
      <div className="absolute hidden group-hover:block top-full left-44 -right-52 bg-white shadow-lg rounded-b-lg z-20 w-[400px] p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-lg mb-2">دسته‌بندی‌ها</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  الکترونیک
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  پوشاک
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  لوازم خانگی
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  ورزشی
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  کتاب و لوازم تحریر
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">محبوب‌ترین‌ها</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  محصولات جدید
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  پرفروش‌ترین‌ها
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  تخفیف‌دار
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  پیشنهاد ویژه
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  