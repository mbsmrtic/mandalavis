import unittest
from mandaladata import MandalaData
from mandala17 import MandalaData17

class TestMandalaData(unittest.TestCase):
    def setUp(self):
        return super().setUp()
    
    def test_a(self):
        self.assertEqual('a', 'a')
        foo = MandalaData17()
        bar = foo.getMandalaData()

if __name__ == '__main__':
    unittest.main()